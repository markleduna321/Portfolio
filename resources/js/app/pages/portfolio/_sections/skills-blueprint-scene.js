import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// How far (in chapters) the first blueprint starts drawing before the section pins.
export const PRE_ROLL = 0.35;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const smoothstep = (edge0, edge1, value) => {
    const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
};
const v3 = (x, y, z) => new THREE.Vector3(x, y, z);

// Callouts rendered as HTML and pinned to 3D anchors. `attach` refers to a named object that moves.
export const BLUEPRINT_LABELS = [
    { chapter: 0, text: 'OPNsense · Sophos XGS', anchor: [0, -0.62, 0.36] },
    { chapter: 0, text: 'Peplink SD-WAN failover', anchor: [-1.2, -0.68, -0.8] },
    { chapter: 0, text: 'VLAN segmentation', anchor: [1.25, -0.8, 0.75] },
    { chapter: 0, text: 'Ubiquiti wireless bridge', anchor: [0, 1.04, -0.15] },
    { chapter: 0, text: 'CI/CD · Python · BDR automation', anchor: [0.44, -0.3, 0] },
    { chapter: 0, text: 'ESP32 · Wi-Fi CSI', anchor: [-1.0, -0.9, 0.1] },

    { chapter: 1, text: 'React · Redux · Inertia · Tailwind', anchor: [1.0, 1.45, 0] },
    { chapter: 1, text: 'Laravel · REST · WebSockets', anchor: [0.85, 0.1, 0.5] },
    { chapter: 1, text: 'PostgreSQL · MySQL', anchor: [0.6, -0.55, 0] },
    { chapter: 1, text: 'PHP', attach: 'lang-0', small: true },
    { chapter: 1, text: 'JavaScript / TypeScript', attach: 'lang-1', small: true },
    { chapter: 1, text: 'Python', attach: 'lang-2', small: true },
    { chapter: 1, text: 'C#', attach: 'lang-3', small: true },

    { chapter: 2, text: 'Custom YOLO · real-time detection', anchor: [0.65, 1.0, 0] },
    { chapter: 2, text: 'Ollama · Odysseus local LLMs', anchor: [-0.35, -0.68, -0.75] },
    { chapter: 2, text: 'OpenAI · Twilio · Google Maps', anchor: [0.3, -0.86, 1.12] },
    { chapter: 2, text: 'Security by Design · SOC 2 / PCI DSS', anchor: [1.25, 0.2, 1.1] },
    { chapter: 2, text: 'Active Directory · M365 identity', anchor: [1.55, -0.72, -0.35] },
];

const COLORS = {
    line: 0x7dd3fc,
    cyan: 0x22d3ee,
    amber: 0xf59e0b,
    violet: 0x818cf8,
};

function circleCurve(radius, y, center = [0, 0]) {
    const points = [];
    for (let i = 0; i < 32; i += 1) {
        const angle = (i / 32) * Math.PI * 2;
        points.push(v3(center[0] + Math.cos(angle) * radius, y, center[1] + Math.sin(angle) * radius));
    }
    return new THREE.CatmullRomCurve3(points, true);
}

function polyline(points) {
    const path = new THREE.CurvePath();
    for (let i = 0; i < points.length - 1; i += 1) {
        path.add(new THREE.LineCurve3(points[i], points[i + 1]));
    }
    return path;
}

function boxAt(w, h, d, x, y, z) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    geometry.translate(x, y, z);
    return geometry;
}

class BlueprintModel {
    constructor({ minY, maxY, named }) {
        this.group = new THREE.Group();
        this.minY = minY;
        this.maxY = maxY;
        this.named = named;
        this.parts = [];
        this.flows = [];
        this.spinners = [];
        this.plane = new THREE.Plane(v3(0, -1, 0), -100);
        this.lineMaterial = new THREE.LineBasicMaterial({
            color: COLORS.line,
            transparent: true,
            opacity: 0.9,
            depthWrite: false,
        });
        this.solidMaterials = [];
        this.packetMaterials = [];

        const base = { clippingPlanes: [this.plane], transparent: true };
        this.materials = {
            body: this.solid({ ...base, color: 0x1a2c48, metalness: 0.55, roughness: 0.36 }),
            panel: this.solid({ ...base, color: 0x23395c, metalness: 0.4, roughness: 0.42 }),
            dark: this.solid({ ...base, color: 0x0c1729, metalness: 0.5, roughness: 0.5 }),
            metal: this.solid({ ...base, color: 0x8ca3c4, metalness: 0.85, roughness: 0.25 }),
            glow: this.solid({ ...base, color: 0x0e7490, emissive: COLORS.cyan, emissiveIntensity: 1.7 }),
            amber: this.solid({ ...base, color: 0x92400e, emissive: COLORS.amber, emissiveIntensity: 1.5 }),
            violet: this.solid({ ...base, color: 0x3730a3, emissive: COLORS.violet, emissiveIntensity: 1.6 }),
            shield: this.solid({
                ...base,
                color: 0x0e7490,
                emissive: COLORS.cyan,
                emissiveIntensity: 0.6,
                opacity: 0.16,
                side: THREE.DoubleSide,
                depthWrite: false,
            }),
        };

        this.scanner = new THREE.Group();
        const scanPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(4.6, 4.6),
            new THREE.MeshBasicMaterial({
                color: COLORS.cyan,
                transparent: true,
                opacity: 0.08,
                side: THREE.DoubleSide,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
            }),
        );
        scanPlane.rotation.x = -Math.PI / 2;
        const scanEdge = new THREE.LineSegments(
            new THREE.EdgesGeometry(new THREE.PlaneGeometry(4.6, 4.6)),
            new THREE.LineBasicMaterial({ color: 0xa5f3fc, transparent: true, opacity: 0.8 }),
        );
        scanEdge.rotation.x = -Math.PI / 2;
        this.scanner.add(scanPlane, scanEdge);
        this.scanMaterials = [scanPlane.material, scanEdge.material];
        this.group.add(this.scanner);
    }

    solid(params) {
        const { opacity = 1, ...rest } = params;
        const material = new THREE.MeshStandardMaterial({ ...rest, opacity });
        material.userData.baseOpacity = opacity;
        this.solidMaterials.push(material);
        return material;
    }

    register(object, line, origin, name) {
        const center = origin.lengthSq() > 0.0001 ? origin.clone() : v3(0, 1, 0);
        this.parts.push({
            object,
            line,
            count: line ? line.geometry.attributes.position.count : 0,
            origin: object.position.clone(),
            dir: center.normalize(),
        });
        this.group.add(object);
        if (name) this.named[name] = object;
        return object;
    }

    addSolid(geometry, material, position = [0, 0, 0], options = {}) {
        const mesh = new THREE.Mesh(geometry, this.materials[material]);
        mesh.position.set(...position);
        if (options.rotation) mesh.rotation.set(...options.rotation);
        let line = null;
        if (options.edges !== false) {
            line = new THREE.LineSegments(
                new THREE.EdgesGeometry(geometry, options.threshold ?? 20),
                this.lineMaterial,
            );
            mesh.add(line);
        }
        return this.register(mesh, line, mesh.position.clone(), options.name);
    }

    addPath(curve, { radius = 0.012, material = 'glow', flow = null, tube = true } = {}) {
        const holder = new THREE.Group();
        const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(curve.getSpacedPoints(120)),
            this.lineMaterial,
        );
        holder.add(line);
        if (tube) {
            const closed = Boolean(curve.closed);
            holder.add(
                new THREE.Mesh(new THREE.TubeGeometry(curve, 96, radius, 6, closed), this.materials[material]),
            );
        }
        if (flow) this.addFlow(curve, flow);
        return this.register(holder, line, curve.getPointAt(0.5));
    }

    addFlow(curve, { count = 2, speed = 0.25, color = COLORS.cyan, size = 0.04 }) {
        const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false });
        this.packetMaterials.push(material);
        const geometry = new THREE.SphereGeometry(size, 10, 10);
        const meshes = Array.from({ length: count }, () => {
            const mesh = new THREE.Mesh(geometry, material);
            this.group.add(mesh);
            return mesh;
        });
        this.flows.push({ curve, meshes, speed });
    }

    addSpinner(object, speed) {
        this.spinners.push({ object, speed });
    }

    update(f, time, isLast) {
        const draw = smoothstep(-0.3, 0.12, f);
        const render = smoothstep(0.1, 0.45, f);
        const explode = isLast ? 0 : smoothstep(0.66, 1, f);
        const visible = draw > 0.001 && explode < 0.999;
        this.group.visible = visible;
        if (!visible) return;

        const count = this.parts.length;
        this.parts.forEach((part, index) => {
            if (part.line) {
                const start = (index / count) * 0.55;
                const local = clamp((draw - start) / 0.45, 0, 1);
                const vertices = part.line.isLineSegments
                    ? Math.floor((part.count * local) / 2) * 2
                    : Math.floor(part.count * local);
                part.line.geometry.setDrawRange(0, vertices);
                part.line.visible = vertices > 0;
            }
            part.object.position
                .copy(part.origin)
                .addScaledVector(part.dir, explode * (1.2 + (index % 3) * 0.45));
        });

        this.lineMaterial.opacity = (0.95 - 0.65 * render) * (1 - explode);

        const sweep = THREE.MathUtils.lerp(this.minY - 0.1, this.maxY + 0.1, render);
        if (render <= 0) this.plane.constant = -100;
        else if (render >= 1) this.plane.constant = 100;
        else this.plane.constant = sweep;

        this.solidMaterials.forEach((material) => {
            material.opacity = material.userData.baseOpacity * (1 - explode);
        });

        const scanning = render > 0 && render < 1;
        this.scanner.visible = scanning;
        if (scanning) {
            this.scanner.position.y = sweep;
            const pulse = Math.sin(render * Math.PI);
            this.scanMaterials[0].opacity = 0.12 * pulse;
            this.scanMaterials[1].opacity = 0.85 * pulse;
        }

        const live = smoothstep(0.45, 0.6, f) * (1 - explode);
        this.packetMaterials.forEach((material) => {
            material.opacity = live;
        });
        this.flows.forEach(({ curve, meshes, speed }) => {
            meshes.forEach((mesh, index) => {
                mesh.visible = live > 0.01;
                if (!mesh.visible) return;
                const t = (time * speed + index / meshes.length) % 1;
                mesh.position.copy(curve.getPointAt(t));
            });
        });
        this.spinners.forEach(({ object, speed }) => {
            object.rotation.y = time * speed;
        });

        this.group.scale.setScalar(1 - 0.12 * explode);
    }
}

function buildNetwork(named) {
    const m = new BlueprintModel({ minY: -1.0, maxY: 1.1, named });

    m.addSolid(new THREE.BoxGeometry(3.4, 0.06, 2.4), 'dark', [0, -1.0, 0]);

    m.addSolid(new THREE.BoxGeometry(1.3, 0.34, 0.7), 'body', [0, -0.8, 0]);
    m.addSolid(new THREE.BoxGeometry(0.9, 0.04, 0.02), 'glow', [0, -0.74, 0.355], { edges: false });

    [-1, 1].forEach((side) => {
        m.addSolid(new THREE.BoxGeometry(0.62, 0.2, 0.42), 'body', [side * 1.2, -0.87, -0.8]);
        m.addSolid(
            mergeGeometries([
                new THREE.CylinderGeometry(0.018, 0.018, 0.4, 8).translate(-0.18, 0, 0),
                new THREE.CylinderGeometry(0.018, 0.018, 0.4, 8).translate(0.18, 0, 0),
            ]),
            'metal',
            [side * 1.2, -0.57, -0.92],
        );
        m.addPath(
            new THREE.CatmullRomCurve3([
                v3(side * 0.45, -0.8, -0.35),
                v3(side * 0.85, -0.58, -0.66),
                v3(side * 1.2, -0.8, -0.59),
            ]),
            {
                material: side < 0 ? 'glow' : 'amber',
                flow: { count: side < 0 ? 3 : 1, speed: side < 0 ? 0.45 : 0.18, color: side < 0 ? COLORS.cyan : COLORS.amber },
            },
        );
    });

    m.addSolid(new THREE.BoxGeometry(1.5, 0.14, 0.4), 'body', [0, -0.9, 0.85]);
    m.addSolid(
        mergeGeometries(Array.from({ length: 8 }, (_, i) => boxAt(0.08, 0.03, 0.02, -0.56 + i * 0.16, 0, 0))),
        'glow',
        [0, -0.88, 1.055],
        { edges: false },
    );
    m.addPath(new THREE.CatmullRomCurve3([v3(0, -0.8, 0.35), v3(0, -0.84, 0.5), v3(0, -0.88, 0.65)]), {
        flow: { count: 2, speed: 0.6 },
    });

    [-1, 1].forEach((side) => {
        m.addSolid(new THREE.CylinderGeometry(0.32, 0.32, 0.03, 40), 'panel', [side * 1.25, -0.955, 0.75]);
        m.addSolid(new THREE.BoxGeometry(0.22, 0.16, 0.16), 'body', [side * 1.25, -0.86, 0.75]);
        m.addPath(circleCurve(0.36, -0.93, [side * 1.25, 0.75]), { material: 'violet', radius: 0.01 });
        m.addPath(
            new THREE.CatmullRomCurve3([v3(side * 0.75, -0.9, 0.85), v3(side * 1.0, -0.86, 0.8), v3(side * 1.14, -0.86, 0.75)]),
            { material: 'violet', flow: { count: 1, speed: 0.5, color: COLORS.violet } },
        );
    });

    m.addSolid(new THREE.BoxGeometry(0.46, 0.03, 0.28), 'panel', [-1.0, -0.955, 0.1]);
    m.addSolid(new THREE.BoxGeometry(0.16, 0.05, 0.16), 'metal', [-1.05, -0.92, 0.1]);
    m.addSolid(new THREE.BoxGeometry(0.1, 0.02, 0.05), 'glow', [-0.84, -0.93, 0.05], { edges: false });

    [-1, 1].forEach((side) => {
        m.addSolid(new THREE.CylinderGeometry(0.03, 0.03, 1.24, 10), 'metal', [side * 1.55, -0.35, -0.15]);
        m.addSolid(
            new THREE.SphereGeometry(0.2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2),
            'panel',
            [side * 1.55, 0.35, -0.15],
            { rotation: [0, 0, side < 0 ? Math.PI / 2 : -Math.PI / 2], threshold: 30 },
        );
    });
    m.addPath(
        new THREE.CatmullRomCurve3([v3(-1.45, 0.35, -0.15), v3(0, 1.04, -0.15), v3(1.45, 0.35, -0.15)]),
        { radius: 0.006, flow: { count: 4, speed: 0.3 } },
    );

    m.addPath(circleCurve(0.44, -0.3), { flow: { count: 4, speed: 0.22 } });

    return m;
}

function buildAppStack(named) {
    const m = new BlueprintModel({ minY: -0.97, maxY: 1.58, named });

    [-0.88, -0.66, -0.44].forEach((y) => {
        m.addSolid(new THREE.CylinderGeometry(0.6, 0.6, 0.18, 48), 'body', [0, y, 0]);
    });
    m.addPath(circleCurve(0.612, -0.77), { radius: 0.01 });
    m.addPath(circleCurve(0.612, -0.55), { radius: 0.01 });

    m.addSolid(new THREE.BoxGeometry(1.7, 0.42, 1.0), 'body', [0, 0, 0]);
    [-0.56, 0, 0.56].forEach((x) => {
        m.addSolid(new THREE.BoxGeometry(0.46, 0.26, 0.02), 'panel', [x, 0, 0.51]);
    });
    m.addSolid(
        mergeGeometries([-0.56, 0, 0.56].map((x) => boxAt(0.05, 0.05, 0.02, x + 0.17, 0.08, 0))),
        'glow',
        [0, 0, 0.525],
        { edges: false },
    );

    m.addSolid(new THREE.BoxGeometry(2.0, 1.15, 0.05), 'panel', [0, 1.0, 0]);
    m.addSolid(new THREE.BoxGeometry(1.8, 0.1, 0.02), 'violet', [0, 1.45, 0.035]);
    m.addSolid(new THREE.BoxGeometry(0.35, 0.8, 0.02), 'dark', [-0.75, 0.92, 0.035]);
    [-0.3, 0.17, 0.64].forEach((x) => {
        m.addSolid(new THREE.BoxGeometry(0.4, 0.3, 0.02), 'body', [x, 1.16, 0.035]);
    });
    m.addSolid(
        mergeGeometries([0.12, 0.22, 0.17, 0.3, 0.26].map((h, i) => boxAt(0.1, h, 0.02, -0.4 + i * 0.2, h / 2, 0))),
        'glow',
        [0.17, 0.56, 0.035],
        { threshold: 40 },
    );

    m.addPath(polyline([v3(-1.05, -0.9, 0), v3(-1.05, 1.0, 0)]), { radius: 0.008, flow: { count: 3, speed: 0.35 } });
    m.addPath(polyline([v3(1.05, 1.0, 0), v3(1.05, -0.9, 0)]), {
        radius: 0.008,
        material: 'violet',
        flow: { count: 3, speed: 0.35, color: COLORS.violet },
    });

    const orbit = new THREE.Group();
    const orbitRing = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(circleCurve(1.45, 0).getSpacedPoints(160)),
        m.lineMaterial,
    );
    orbit.add(orbitRing);
    const nodeGeometry = new THREE.SphereGeometry(0.07, 16, 16);
    for (let i = 0; i < 4; i += 1) {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const node = new THREE.Mesh(nodeGeometry, m.materials.glow);
        node.position.set(Math.cos(angle) * 1.45, 0, Math.sin(angle) * 1.45);
        orbit.add(node);
        named[`lang-${i}`] = node;
    }
    m.register(orbit, orbitRing, v3(0, -1, 0));
    m.addSpinner(orbit, 0.22);

    return m;
}

function buildChip(named) {
    const m = new BlueprintModel({ minY: -0.97, maxY: 1.05, named });

    m.addSolid(new THREE.BoxGeometry(2.3, 0.1, 2.3), 'dark', [0, -0.92, 0]);

    const pins = [];
    for (let i = 0; i < 9; i += 1) {
        const offset = -0.96 + i * 0.24;
        pins.push(boxAt(0.2, 0.04, 0.09, 1.24, 0, offset), boxAt(0.2, 0.04, 0.09, -1.24, 0, offset));
        pins.push(boxAt(0.09, 0.04, 0.2, offset, 0, 1.24), boxAt(0.09, 0.04, 0.2, offset, 0, -1.24));
    }
    m.addSolid(mergeGeometries(pins), 'metal', [0, -0.93, 0], { threshold: 40 });

    m.addSolid(new THREE.BoxGeometry(1.1, 0.16, 1.1), 'body', [0, -0.79, 0]);
    const cores = [];
    for (let i = 0; i < 4; i += 1) {
        for (let j = 0; j < 4; j += 1) {
            cores.push(boxAt(0.17, 0.03, 0.17, -0.375 + i * 0.25, 0, -0.375 + j * 0.25));
        }
    }
    m.addSolid(mergeGeometries(cores), 'glow', [0, -0.695, 0], { threshold: 40 });

    const traceY = -0.865;
    [-0.3, 0.3].forEach((offset) => {
        [
            [v3(0.55, traceY, offset), v3(0.8, traceY, offset), v3(0.95, traceY, offset * 1.8), v3(1.12, traceY, offset * 1.8)],
            [v3(-0.55, traceY, offset), v3(-0.8, traceY, offset), v3(-0.95, traceY, offset * 1.8), v3(-1.12, traceY, offset * 1.8)],
            [v3(offset, traceY, 0.55), v3(offset, traceY, 0.8), v3(offset * 1.8, traceY, 0.95), v3(offset * 1.8, traceY, 1.12)],
            [v3(offset, traceY, -0.55), v3(offset, traceY, -0.8), v3(offset * 1.8, traceY, -0.95), v3(offset * 1.8, traceY, -1.12)],
        ].forEach((points) => {
            m.addPath(polyline(points), { radius: 0.008, flow: { count: 1, speed: 0.4, size: 0.03 } });
        });
    });

    m.addPath(polyline([v3(0, -0.68, 0), v3(0, 0.1, 0)]), {
        radius: 0.006,
        material: 'violet',
        flow: { count: 3, speed: 0.5, color: COLORS.violet },
    });

    const frame = polyline([
        v3(-0.65, 0.1, 0),
        v3(0.65, 0.1, 0),
        v3(0.65, 1.0, 0),
        v3(-0.65, 1.0, 0),
        v3(-0.65, 0.1, 0),
    ]);
    m.addPath(frame, { radius: 0.006 });
    const bracket = (x, y, sx, sy) => [
        boxAt(0.22, 0.035, 0.035, x + (sx * 0.11), y, 0),
        boxAt(0.035, 0.22, 0.035, x, y + (sy * 0.11), 0),
    ];
    m.addSolid(
        mergeGeometries([
            ...bracket(-0.65, 0.1, 1, 1),
            ...bracket(0.65, 0.1, -1, 1),
            ...bracket(0.65, 1.0, -1, -1),
            ...bracket(-0.65, 1.0, 1, -1),
        ]),
        'glow',
        [0, 0, 0],
        { edges: false },
    );
    const target = m.addSolid(new THREE.IcosahedronGeometry(0.22, 0), 'violet', [0, 0.55, 0], { threshold: 10 });
    m.addSpinner(target, 0.6);

    const shield = new THREE.Group();
    const hexGeometry = new THREE.CylinderGeometry(1.75, 1.75, 0.5, 6, 1, true);
    const hex = new THREE.Mesh(hexGeometry, m.materials.shield);
    const hexLine = new THREE.LineSegments(new THREE.EdgesGeometry(hexGeometry, 20), m.lineMaterial);
    hex.add(hexLine);
    shield.add(hex);
    const vertexGeometry = new THREE.SphereGeometry(0.06, 12, 12);
    [0, 3].forEach((vertex, index) => {
        const angle = (vertex / 6) * Math.PI * 2 + Math.PI / 2;
        const node = new THREE.Mesh(vertexGeometry, m.materials.glow);
        node.position.set(Math.cos(angle) * 1.75, 0.25, Math.sin(angle) * 1.75);
        shield.add(node);
        named[`shield-${index}`] = node;
    });
    shield.position.y = -0.62;
    m.register(shield, hexLine, v3(0, -1, 0));
    m.addSpinner(shield, 0.12);

    return m;
}

export function createBlueprintScene(canvas) {
    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
        return null;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.localClippingEnabled = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    const lookAt = v3(0, -0.12, 0);

    scene.add(new THREE.AmbientLight(0xa5b4fc, 1.1));
    const key = new THREE.DirectionalLight(0xe0f2fe, 2.4);
    key.position.set(3, 5, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0x22d3ee, 30, 14);
    rim.position.set(-3.5, 1.5, -2.5);
    scene.add(rim);
    const fill = new THREE.PointLight(0x818cf8, 16, 12);
    fill.position.set(3, -1, 3);
    scene.add(fill);

    const root = new THREE.Group();
    scene.add(root);

    const named = {};
    const models = [buildNetwork(named), buildAppStack(named), buildChip(named)];
    models.forEach((model) => root.add(model.group));

    const labelAnchors = BLUEPRINT_LABELS.map((label) => (label.anchor ? v3(...label.anchor) : null));
    const world = new THREE.Vector3();
    const projected = new THREE.Vector3();
    const toCamera = new THREE.Vector3();
    const cameraFlat = new THREE.Vector3(0, 0, 1);
    const labelStates = BLUEPRINT_LABELS.map(() => ({ x: 0, y: 0, opacity: 0, side: 'right' }));
    let width = 1;
    let height = 1;
    let progress = -PRE_ROLL;

    const resize = (nextWidth, nextHeight) => {
        width = Math.max(1, nextWidth);
        height = Math.max(1, nextHeight);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        const distance = 8.6 * Math.max(1, 1.3 / camera.aspect);
        camera.position.set(0, distance * 0.36, distance * 0.93);
        camera.lookAt(lookAt);
        cameraFlat.copy(camera.position).sub(lookAt).setY(0).normalize();
        camera.updateProjectionMatrix();
    };

    const update = (u, time) => {
        progress = u;
        root.rotation.y = -0.55 + u * 0.6 + Math.sin(time * 0.3) * 0.06;
        models.forEach((model, index) => model.update(u - index, time, index === models.length - 1));
        root.updateMatrixWorld(true);

        const center = projected.copy(lookAt).project(camera).x;
        BLUEPRINT_LABELS.forEach((label, index) => {
            const state = labelStates[index];
            const f = progress - label.chapter;
            const order = BLUEPRINT_LABELS.slice(0, index).filter((item) => item.chapter === label.chapter).length;
            const fadeIn = smoothstep(0.45 + order * 0.025, 0.53 + order * 0.025, f);
            const fadeOut = label.chapter === models.length - 1 ? 1 : 1 - smoothstep(0.64, 0.72, f);
            state.opacity = fadeIn * fadeOut;
            if (state.opacity <= 0.001) return;

            if (label.attach) {
                named[label.attach].getWorldPosition(world);
                // Fade moving callouts while their node swings behind the model.
                const facing = toCamera.copy(world).sub(lookAt).setY(0).normalize().dot(cameraFlat);
                state.opacity *= smoothstep(-0.15, 0.35, facing);
            } else {
                world.copy(labelAnchors[index]).applyMatrix4(root.matrixWorld);
            }
            projected.copy(world).project(camera);
            state.x = ((projected.x + 1) / 2) * width;
            state.y = ((1 - projected.y) / 2) * height;
            state.side = projected.x >= center ? 'right' : 'left';
            if (projected.z > 1) state.opacity = 0;
        });
    };

    const render = () => renderer.render(scene, camera);

    const dispose = () => {
        scene.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) =>
                    material.dispose(),
                );
            }
        });
        renderer.dispose();
    };

    return { resize, update, render, dispose, labelStates };
}
