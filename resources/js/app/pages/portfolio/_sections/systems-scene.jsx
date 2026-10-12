import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';
import { getSummaryTransition, PORTRAIT_IMAGE, SUMMARY_TIMELINE } from './summary-transition';

export default function SystemsScene() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const context = canvas.getContext('webgl2', { alpha: true, antialias: true });
        if (!context) return undefined;

        const heroAnchor = document.querySelector('#hero-scene-anchor');
        const portraitAnchor = document.querySelector('#summary-portrait-anchor');
        if (!heroAnchor || !portraitAnchor) return undefined;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.set(0, 0, 8.6);

        const renderer = new THREE.WebGLRenderer({
            canvas,
            context,
            alpha: true,
            antialias: true,
            powerPreference: 'low-power',
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;

        scene.add(new THREE.AmbientLight(0xcbd5e1, 1.8));

        const keyLight = new THREE.PointLight(0x38bdf8, 34, 12);
        keyLight.position.set(3, 3, 4);
        scene.add(keyLight);

        const rimLight = new THREE.PointLight(0x6366f1, 30, 12);
        rimLight.position.set(-3, -2, 2);
        scene.add(rimLight);

        const system = new THREE.Group();
        system.rotation.set(-0.18, 0.12, -0.08);
        scene.add(system);

        const core = new THREE.Group();
        system.add(core);

        const coreMesh = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.82, 4),
            new THREE.MeshPhysicalMaterial({
                color: 0x172554,
                metalness: 0.72,
                roughness: 0.24,
                clearcoat: 0.9,
                clearcoatRoughness: 0.16,
                emissive: 0x07152e,
                emissiveIntensity: 0.7,
            }),
        );
        core.add(coreMesh);

        const coreWireframe = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.91, 2),
            new THREE.MeshBasicMaterial({
                color: 0x7dd3fc,
                wireframe: true,
                transparent: true,
                opacity: 0.24,
            }),
        );
        core.add(coreWireframe);

        const innerCore = new THREE.Mesh(
            new THREE.SphereGeometry(0.42, 32, 32),
            new THREE.MeshBasicMaterial({
                color: 0x38bdf8,
                transparent: true,
                opacity: 0.12,
            }),
        );
        core.add(innerCore);

        const orbitMaterials = [
            new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.43 }),
            new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.35 }),
            new THREE.MeshBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.24 }),
        ];
        const nodeMaterials = [
            new THREE.MeshStandardMaterial({
                color: 0xe0f2fe,
                emissive: 0x38bdf8,
                emissiveIntensity: 2.5,
                metalness: 0.4,
                roughness: 0.25,
            }),
            new THREE.MeshStandardMaterial({
                color: 0xe0e7ff,
                emissive: 0x818cf8,
                emissiveIntensity: 2.2,
                metalness: 0.35,
                roughness: 0.28,
            }),
        ];
        const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xbae6fd });
        const particleGeometry = new THREE.SphereGeometry(0.035, 12, 12);
        const orbits = [];
        const orbitNodes = [];

        const createOrbit = (radius, tilt, nodeCount, speed, phase) => {
            const orbit = new THREE.Group();
            orbit.rotation.x = tilt;
            system.add(orbit);

            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(radius, 0.008, 8, 144),
                orbitMaterials[orbits.length],
            );
            orbit.add(ring);

            for (let i = 0; i < nodeCount; i += 1) {
                const angle = (i / nodeCount) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const node = new THREE.Mesh(
                    new THREE.SphereGeometry(i === 0 ? 0.095 : 0.065, 20, 20),
                    nodeMaterials[i % nodeMaterials.length],
                );
                node.position.set(x, y, 0);
                orbit.add(node);
                orbitNodes.push({ mesh: node, x, y, z: 0, radius });

                const connector = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(x, y, 0),
                ]);
                orbit.add(new THREE.Line(
                    connector,
                    new THREE.LineBasicMaterial({
                        color: 0x64748b,
                        transparent: true,
                        opacity: 0.18,
                    }),
                ));
            }

            const particles = [0, 1].map((index) => {
                const particle = new THREE.Mesh(particleGeometry, particleMaterial);
                orbit.add(particle);
                return {
                    mesh: particle,
                    angle: phase + index * Math.PI,
                };
            });

            orbits.push({ group: orbit, radius, speed, particles });
        };

        createOrbit(1.45, 0.38, 6, 0.24, 0.1);
        createOrbit(2.08, -0.72, 8, -0.16, 1.3);
        createOrbit(2.62, 1.12, 10, 0.11, 2.1);

        const starPositions = new Float32Array(96 * 3);
        for (let i = 0; i < 96; i += 1) {
            const index = i * 3;
            const angle = Math.random() * Math.PI * 2;
            const radius = 2.9 + Math.random() * 1.5;
            starPositions[index] = Math.cos(angle) * radius;
            starPositions[index + 1] = Math.sin(angle) * radius;
            starPositions[index + 2] = (Math.random() - 0.5) * 1.5;
        }
        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        const stars = new THREE.Points(
            starGeometry,
            new THREE.PointsMaterial({
                color: 0x94a3b8,
                size: 0.018,
                transparent: true,
                opacity: 0.48,
                sizeAttenuation: true,
            }),
        );
        system.add(stars);

        const disassemblyMaterial = new THREE.MeshBasicMaterial({
            color: 0x7dd3fc,
            transparent: true,
            opacity: 0,
            wireframe: true,
        });
        const disassemblyParts = Array.from({ length: 32 }, (_, index) => {
            const angle = index * 2.399963229728653;
            const vertical = 1 - 2 * ((index + 0.5) / 32);
            const horizontal = Math.sqrt(1 - vertical * vertical);
            const direction = new THREE.Vector3(
                Math.cos(angle) * horizontal,
                vertical,
                Math.sin(angle) * horizontal,
            ).normalize();
            const mesh = new THREE.Mesh(
                new THREE.TetrahedronGeometry(0.075 + (index % 3) * 0.018, 0),
                disassemblyMaterial,
            );
            system.add(mesh);
            return { mesh, direction };
        });

        const fadeMaterials = new Map();
        system.traverse((object) => {
            if (!object.material || object.material === disassemblyMaterial) return;
            if (!fadeMaterials.has(object.material)) {
                object.material.transparent = true;
                fadeMaterials.set(object.material, object.material.opacity);
            }
        });

        // Portrait particles: every point carries the colour of one portrait pixel and
        // travels from the surface of the core to its exact place on the photo.
        const portraitColumns = 72;
        const portraitRows = 90;
        const canvasExpansion = 1.7;
        const visibleHeight = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
        const planeHeight = visibleHeight / canvasExpansion;
        const planeWidth = planeHeight * (portraitColumns / portraitRows);
        const portraitUniforms = {
            uProgress: { value: 0 },
            uOpacity: { value: 0 },
            uTime: { value: 0 },
            uSize: { value: 1 },
            uOrigin: { value: new THREE.Vector3() },
            uOriginScale: { value: 1 },
            uCoreRotation: { value: 0 },
        };
        let portraitPoints = null;
        let disposed = false;

        const buildPortraitPoints = (image) => {
            if (disposed) return;
            const sampler = document.createElement('canvas');
            sampler.width = portraitColumns;
            sampler.height = portraitRows;
            const samplerContext = sampler.getContext('2d', { willReadFrequently: true });
            if (!samplerContext) return;
            samplerContext.drawImage(image, 0, 0, portraitColumns, portraitRows);
            const { data } = samplerContext.getImageData(0, 0, portraitColumns, portraitRows);

            const targets = [];
            const starts = [];
            const colors = [];
            const seeds = [];
            const maxDistance = Math.hypot(portraitColumns / 2, portraitRows / 2);

            for (let row = 0; row < portraitRows; row += 1) {
                for (let column = 0; column < portraitColumns; column += 1) {
                    const pixel = (row * portraitColumns + column) * 4;
                    const alpha = data[pixel + 3] / 255;
                    if (alpha < 0.08) continue;
                    targets.push(
                        ((column + 0.5) / portraitColumns - 0.5) * planeWidth,
                        (0.5 - (row + 0.5) / portraitRows) * planeHeight,
                        0,
                    );
                    colors.push(data[pixel] / 255, data[pixel + 1] / 255, data[pixel + 2] / 255, alpha);

                    const theta = Math.random() * Math.PI * 2;
                    const z = Math.random() * 2 - 1;
                    const ring = Math.sqrt(1 - z * z);
                    starts.push(Math.cos(theta) * ring, Math.sin(theta) * ring, z);

                    const centerDistance = Math.hypot(
                        column + 0.5 - portraitColumns / 2,
                        row + 0.5 - portraitRows / 2,
                    ) / maxDistance;
                    seeds.push(
                        centerDistance * 0.28 + Math.random() * 0.17,
                        Math.random(),
                        Math.random(),
                        Math.random(),
                    );
                }
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(targets, 3));
            geometry.setAttribute('aStart', new THREE.Float32BufferAttribute(starts, 3));
            geometry.setAttribute('aColor', new THREE.Float32BufferAttribute(colors, 4));
            geometry.setAttribute('aSeed', new THREE.Float32BufferAttribute(seeds, 4));

            const material = new THREE.ShaderMaterial({
                uniforms: portraitUniforms,
                transparent: true,
                depthWrite: false,
                depthTest: false,
                vertexShader: `
                    uniform float uProgress;
                    uniform float uTime;
                    uniform float uSize;
                    uniform float uOriginScale;
                    uniform float uCoreRotation;
                    uniform vec3 uOrigin;
                    attribute vec3 aStart;
                    attribute vec4 aColor;
                    attribute vec4 aSeed;
                    varying vec4 vColor;
                    varying float vSettled;

                    void main() {
                        float t = clamp((uProgress - aSeed.x) / 0.55, 0.0, 1.0);
                        float eased = t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
                        float c = cos(uCoreRotation);
                        float s = sin(uCoreRotation);
                        vec3 direction = vec3(c * aStart.x + s * aStart.z, aStart.y, -s * aStart.x + c * aStart.z);
                        vec3 start = uOrigin + direction * (0.84 + aSeed.y * 0.1) * uOriginScale;
                        vec3 burst = normalize(direction + vec3(aSeed.y - 0.5, aSeed.z - 0.5, aSeed.w - 0.5))
                            * (0.7 + aSeed.z * 1.3);
                        vec3 swirl = vec3(-direction.y, direction.x, 0.0) * sin(uTime * 1.4 + aSeed.w * 6.2831) * 0.12;
                        vec3 transformed = mix(start, position, eased) + (burst + swirl) * sin(eased * 3.14159);

                        vColor = aColor;
                        vSettled = eased;
                        gl_PointSize = uSize * mix(0.55 + aSeed.y * 0.5, 1.0, eased);
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform float uOpacity;
                    varying vec4 vColor;
                    varying float vSettled;

                    void main() {
                        float distanceToCenter = length(gl_PointCoord - 0.5);
                        float roundShape = 1.0 - smoothstep(0.38, 0.5, distanceToCenter);
                        float shape = mix(roundShape, 1.0, smoothstep(0.82, 1.0, vSettled));
                        if (shape < 0.01) discard;

                        vec3 glow = vec3(0.49, 0.83, 0.99);
                        float energy = 1.0 - vSettled;
                        vec3 color = mix(vColor.rgb, glow, energy * 0.6) + glow * energy * 0.25;
                        float alpha = mix(1.0, vColor.a, smoothstep(0.6, 1.0, vSettled));
                        gl_FragColor = vec4(color, shape * alpha * uOpacity);
                    }
                `,
            });

            portraitPoints = new THREE.Points(geometry, material);
            portraitPoints.frustumCulled = false;
            portraitPoints.renderOrder = 10;
            scene.add(portraitPoints);
            scheduleRender();
        };

        const portraitImage = new Image();
        portraitImage.decoding = 'async';
        portraitImage.onload = () => buildPortraitPoints(portraitImage);
        portraitImage.src = PORTRAIT_IMAGE;

        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const startTime = performance.now();
        let frameId;
        let animationRunning = false;
        let width = 0;
        let height = 0;
        let aspect = 0;

        const smoothstep = (edge0, edge1, value) => {
            const t = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1);
            return t * t * (3 - 2 * t);
        };
        const lerp = THREE.MathUtils.lerp;

        const renderScene = () => {
            animationRunning = false;
            const reduced = motionPreference.matches;
            const { flight, assemble: rawAssemble } = getSummaryTransition();
            const assemble = reduced ? 0 : rawAssemble;
            const travel = reduced ? 0 : smoothstep(0, 1, flight);
            const heroRect = heroAnchor.getBoundingClientRect();
            const portraitRect = portraitAnchor.getBoundingClientRect();

            heroAnchor.style.opacity = `${1 - smoothstep(0.05, 0.42, flight)}`;

            const target = {
                left: portraitRect.left - (portraitRect.width * (canvasExpansion - 1)) / 2,
                top: portraitRect.top - (portraitRect.height * (canvasExpansion - 1)) / 2,
                width: portraitRect.width * canvasExpansion,
                height: portraitRect.height * canvasExpansion,
            };
            const rect = {
                left: lerp(heroRect.left, target.left, travel),
                top: lerp(heroRect.top, target.top, travel),
                width: Math.max(1, lerp(heroRect.width, target.width, travel)),
                height: Math.max(1, lerp(heroRect.height, target.height, travel)),
            };

            const [, particlesOutEnd] = SUMMARY_TIMELINE.particlesOut;
            const canvasOpacity = reduced
                ? 1 - smoothstep(0, 0.4, flight)
                : 1;
            const canvasVisible = reduced ? flight < 0.4 : assemble < particlesOutEnd;
            canvas.style.left = `${rect.left}px`;
            canvas.style.top = `${rect.top}px`;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            canvas.style.opacity = `${canvasOpacity}`;
            canvas.style.visibility = canvasVisible ? 'visible' : 'hidden';

            if (!canvasVisible) return;

            const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
            const nextWidth = Math.round(rect.width * pixelRatio);
            const nextHeight = Math.round(rect.height * pixelRatio);
            if (nextWidth !== width || nextHeight !== height) {
                width = nextWidth;
                height = nextHeight;
                renderer.setPixelRatio(pixelRatio);
                renderer.setSize(rect.width, rect.height, false);
            }
            if (Math.abs(aspect - rect.width / rect.height) > 0.0001) {
                aspect = rect.width / rect.height;
                camera.aspect = aspect;
                camera.updateProjectionMatrix();
            }

            const elapsed = reduced ? 0 : (performance.now() - startTime) / 1000;
            const systemScale = (heroRect.height / rect.height) * (1 + 0.14 * travel);
            const breakApart = smoothstep(...SUMMARY_TIMELINE.breakApart, assemble);
            const systemFade = 1 - smoothstep(0, 0.16, assemble);

            system.scale.setScalar(systemScale);
            system.position.x = -0.22 * travel * systemScale;
            system.position.y = reduced ? 0 : Math.sin(elapsed * 0.55) * 0.08 * (1 - travel);
            system.rotation.y = 0.12 + (reduced ? 0 : Math.sin(elapsed * 0.16) * 0.08);
            system.visible = systemFade > 0.001;
            core.rotation.y = elapsed * 0.2 + flight * 0.7;
            core.rotation.x = Math.sin(elapsed * 0.22) * 0.12;
            core.scale.setScalar(1 + travel * 0.12 + breakApart * 0.1);

            fadeMaterials.forEach((baseOpacity, material) => {
                material.opacity = baseOpacity * systemFade;
            });

            orbitNodes.forEach(({ mesh, x, y, z }, index) => {
                const scatter = 1 + (travel * 0.25 + breakApart) * (0.9 + (index % 4) * 0.2);
                mesh.position.set(
                    x * scatter,
                    y * scatter,
                    z + Math.sin(elapsed * 2 + index) * breakApart * 0.55,
                );
            });

            orbits.forEach(({ group, radius, speed, particles }) => {
                group.rotation.z = speed * elapsed;
                particles.forEach(({ mesh, angle }, index) => {
                    const currentAngle = angle + elapsed * speed;
                    mesh.position.set(
                        Math.cos(currentAngle) * radius,
                        Math.sin(currentAngle) * radius,
                        index === 0 ? 0.025 : -0.025,
                    );
                });
            });

            const shardBurst = smoothstep(0.6, 1, travel) * 0.35 + breakApart;
            disassemblyMaterial.opacity = shardBurst * 0.6 * (1 - smoothstep(0.1, 0.24, assemble));
            disassemblyParts.forEach(({ mesh, direction }, index) => {
                mesh.position.copy(direction).multiplyScalar(0.9 + shardBurst * (1 + (index % 5) * 0.18));
                mesh.rotation.set(elapsed + index, elapsed * 0.7, elapsed * 0.5);
            });

            if (portraitPoints) {
                const [assembleStart, assembleEnd] = SUMMARY_TIMELINE.assemble;
                const particlesOut = smoothstep(...SUMMARY_TIMELINE.particlesOut, assemble);
                portraitUniforms.uProgress.value = THREE.MathUtils.clamp(
                    (assemble - assembleStart) / (assembleEnd - assembleStart),
                    0,
                    1,
                );
                portraitUniforms.uOpacity.value = smoothstep(0, 0.07, assemble) * (1 - particlesOut);
                portraitUniforms.uTime.value = elapsed;
                portraitUniforms.uSize.value = (portraitRect.width / portraitColumns) * pixelRatio * 1.04;
                portraitUniforms.uOrigin.value.set(system.position.x, system.position.y, 0);
                portraitUniforms.uOriginScale.value = systemScale * core.scale.x;
                portraitUniforms.uCoreRotation.value = core.rotation.y;
                portraitPoints.visible = portraitUniforms.uOpacity.value > 0.001;
            }

            renderer.render(scene, camera);
            if (!reduced) scheduleRender();
        };

        const scheduleRender = () => {
            if (animationRunning) return;
            animationRunning = true;
            frameId = window.requestAnimationFrame(renderScene);
        };

        const handleScroll = () => {
            if (motionPreference.matches) {
                scheduleRender();
            } else if (!animationRunning) {
                scheduleRender();
            }
        };

        if (motionPreference.matches) renderScene();
        else scheduleRender();
        const handleMotionPreference = () => {
            window.cancelAnimationFrame(frameId);
            animationRunning = false;
            scheduleRender();
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        motionPreference.addEventListener('change', handleMotionPreference);

        return () => {
            disposed = true;
            portraitImage.onload = null;
            window.cancelAnimationFrame(frameId);
            animationRunning = false;
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            motionPreference.removeEventListener('change', handleMotionPreference);
            heroAnchor.style.opacity = '';
            scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    const materials = Array.isArray(object.material)
                        ? object.material
                        : [object.material];
                    materials.forEach((material) => material.dispose());
                }
            });
            renderer.dispose();
        };
    }, []);

    return createPortal(
        <canvas
            ref={canvasRef}
            aria-label="Animated 3D visualization of connected automation and systems architecture"
            role="img"
            className="pointer-events-none fixed z-40"
            style={{
                left: 0,
                top: 0,
                width: 1,
                height: 1,
                opacity: 0,
            }}
        />,
        document.body,
    );
}
