import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../../components/section-title';
import Card from '../../components/card';
import Badge from '../../components/badge';
import Modal from '../../components/modal';
import Button from '../../components/button';
import {
    CodeBracketIcon,
    GlobeAltIcon,
    ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');

    // Mock data - will be replaced with Redux state
    const projects = [
        {
            id: 1,
            title: 'Asset Management System',
            description: 'Enterprise asset tracking and inventory management platform',
            fullDescription: 'Developed a comprehensive asset management system for EmpireOne to track and manage IT assets including monitors, system units, peripherals, and workstation locations. Features real-time dashboards, financial metrics tracking, transaction history, and asset value growth analytics.',
            image: '/images/projects/eo-assetmanagement.png',
            techStack: ['React', 'Laravel', 'MySQL', 'Chart.js', 'Tailwind CSS'],
            category: 'web',
            githubUrl: 'https://github.com/markleduna321/eo-inventory',
            liveUrl: 'https://eo-assetmanagement.com',
            features: [
                'Real-time inventory dashboard with key metrics',
                'Asset distribution visualization (pie charts)',
                'Asset value growth tracking over time',
                'Transaction history and audit logs',
                'Financial metrics and depreciation tracking',
                'Multi-category asset management (Monitors, System Units, Peripherals, Stations)',
                'User management and role-based access',
                'Advanced filtering and search capabilities',
            ],
            codePreview: `// Asset Dashboard Component
const AssetDashboard = () => {
  const [metrics, setMetrics] = useState({});
  
  useEffect(() => {
    fetchAssetMetrics().then(data => {
      setMetrics({
        monitors: data.monitors,
        systemUnits: data.systemUnits,
        peripherals: data.peripherals,
        stations: data.stations,
        totalValue: data.totalAssetValue
      });
    });
  }, []);
  
  return (
    <div className="dashboard-grid">
      <MetricCard 
        title="Monitors" 
        value={metrics.monitors?.total}
        active={metrics.monitors?.active}
      />
      {/* Additional metric cards */}
    </div>
  );
};`,
        },
        {
            id: 2,
            title: 'IP Ping Logger',
            description: 'Network monitoring desktop application for tracking IP connectivity',
            fullDescription: 'Developed a Python-based desktop application for monitoring network connectivity to multiple IP addresses and domains. Features continuous ping monitoring, uptime tracking, response time measurements, email reports, sound alerts, and detailed logging for Globe, Parasat, Google.com, Gateway, and custom IP addresses.',
            image: '/images/projects/ip-ping-logger.png',
            techStack: ['Python', 'HTML', 'ICMP Protocol'],
            category: 'desktop',
            githubUrl: 'https://github.com/markleduna321/Pinger',
            liveUrl: null,
            features: [
                'Continuous ping monitoring for multiple targets',
                'Real-time uptime percentage tracking',
                'Network latency measurements (TTL)',
                'Separate monitoring for Globe, Parasat, Google.com, Gateway, and custom IPs',
                'Save and remove IP addresses',
                'Email report generation and sending',
                'Sound alert notifications',
                'Color-coded status indicators',
                'Detailed timestamp logging',
            ],
            codePreview: `# Continuous Ping Implementation
import subprocess
import time

def continuous_ping(ip_address):
    while monitoring:
        try:
            # Execute ping command
            result = subprocess.run(
                ['ping', '-n', '1', ip_address],
                capture_output=True,
                text=True,
                timeout=1
            )
            
            update_ping_stats(ip_address, result)
            log_ping_result(ip_address, result)
            
        except subprocess.TimeoutExpired:
            log_timeout(ip_address)
            play_alert_sound()
        
        time.sleep(1)`,
        },
        {
            id: 3,
            title: 'AutoRecord - OBS Recording',
            description: 'Automated screen recording based on keyboard and mouse activity',
            fullDescription: 'Created a Python automation tool that intelligently controls OBS Studio recording based on user activity. The application automatically starts recording when keyboard or mouse activity is detected and stops after 1 minute of inactivity. Features background monitoring, OBS WebSocket integration, and system tray minimization for seamless operation.',
            image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
            techStack: ['Python', 'OBS Studio', 'WebSocket', 'keyboard', 'pynput'],
            category: 'desktop',
            githubUrl: 'https://github.com/markleduna321/AutoRecord',
            liveUrl: null,
            features: [
                'Auto-start recording on keyboard/mouse activity detection',
                'Auto-stop recording after 1 minute of inactivity',
                'OBS WebSocket integration for remote control',
                'Background monitoring with separate threads',
                'OBS minimization to system tray',
                'Startup automation support',
                'Customizable inactivity duration threshold',
                'Cross-platform Python implementation',
            ],
            codePreview: `# Activity Monitoring Implementation
def monitor_inactivity():
    global last_activity_time
    
    while True:
        # Check if inactivity threshold exceeded
        if time.time() - last_activity_time > 60:
            if recording:
                ws.call(requests.StopRecording())
                recording = False
                print("Recording stopped due to inactivity")
        
        time.sleep(1)

def on_activity_detected():
    global last_activity_time, recording
    last_activity_time = time.time()
    
    if not recording:
        ws.call(requests.StartRecording())
        recording = True
        print("Recording started")`,
        },
        {
            id: 4,
            title: 'NetMonitor Pro',
            description: 'Advanced network monitoring application with real-time graphs and bandwidth tracking',
            fullDescription: 'Created a modern network monitoring application inspired by MRTG, featuring real-time visualization of network performance. Built with FastAPI backend and a responsive dashboard powered by Tailwind CSS and Chart.js. Monitors multiple ISP IPs, DNS servers, tracks bandwidth per gateway, and provides comprehensive logging with SQLite database. Includes WebSocket-based live updates and configurable alert system for latency and packet loss thresholds.',
            image: '/images/projects/net-monitor.png',
            techStack: ['Python', 'FastAPI', 'SQLite', 'WebSocket', 'Chart.js', 'Tailwind CSS'],
            category: 'web',
            githubUrl: 'https://github.com/markleduna321/net-monitor-pro',
            liveUrl: null,
            features: [
                'Ping monitoring for multiple ISPs and DNS servers',
                'Real-time latency and bandwidth visualization with Chart.js',
                'Bandwidth tracking per gateway interface',
                'Historical data logging with SQLite database',
                'Configurable alert system for latency and packet loss',
                'WebSocket-based live dashboard updates',
                'Modern responsive UI with Tailwind CSS',
                'RESTful API endpoints for data access',
                'Customizable monitoring intervals and thresholds',
            ],
            codePreview: `# FastAPI Network Monitoring
from fastapi import FastAPI, WebSocket
import asyncio

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        # Get latest network stats
        ping_stats = await get_ping_statistics()
        bandwidth_stats = await get_bandwidth_stats()
        
        # Send real-time updates
        await websocket.send_json({
            "ping": ping_stats,
            "bandwidth": bandwidth_stats,
            "timestamp": datetime.now().isoformat()
        })
        
        await asyncio.sleep(5)

@app.get("/api/ping/history")
async def get_ping_history():
    return database.query_ping_history(days=7)`,
        },
        {
            id: 5,
            title: 'AI Voice Agent for Call Centers',
            description: 'Production-ready AI voice agent with OpenAI Realtime API and Twilio integration',
            fullDescription: 'Built a comprehensive AI-powered call center solution using OpenAI\'s GPT-4 Realtime API. Features real-time voice conversations, PostgreSQL database for persistent storage, web-based admin dashboard, function calling to integrate with external APIs, complete call recording with transcripts, QA & review system, and session management. Includes WebSocket-based live updates, Twilio phone integration, and RESTful APIs for client system integration.',
            image: '/images/projects/AI.png',
            techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'OpenAI API', 'Twilio', 'WebSocket', 'FastAPI'],
            category: 'ai',
            githubUrl: 'https://github.com/markleduna321/ai-voice-agent',
            liveUrl: null,
            features: [
                'Real-time voice conversations using OpenAI GPT-4 Realtime API',
                'PostgreSQL database for persistent data storage',
                'Web-based admin dashboard with Tailwind CSS',
                'Function calling to connect AI with external APIs',
                'Complete call & chat records with full transcripts',
                'QA & review system with ratings, tags, and outcomes',
                'Session management with search, filter, and export',
                'Client integration via REST APIs and webhooks',
                'Twilio integration for phone call handling',
                'Voice Activity Detection (VAD) for natural conversations',
                'Configurable AI personality and voice selection',
                'Local testing without phone calls',
            ],
            codePreview: `// OpenAI Realtime API Integration
import { RealtimeClient } from '@openai/realtime-api-beta';

const client = new RealtimeClient({
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4-realtime-preview'
});

// Configure voice and personality
await client.updateSession({
  voice: 'alloy',
  instructions: 'You are a professional call center agent...',
  turn_detection: {
    type: 'server_vad',
    threshold: 0.5,
    silence_duration_ms: 500
  }
});

// Handle function calls
client.on('conversation.item.completed', async (item) => {
  if (item.type === 'function_call') {
    const result = await executeFunctionCall(
      item.name,
      item.arguments
    );
    await client.sendFunctionResult(item.call_id, result);
  }
});`,
        },
        {
            id: 6,
            title: 'DSWD IMS',
            description: 'Government welfare program management system for DSWD',
            fullDescription: 'Developed a comprehensive welfare program management system for the Department of Social Welfare and Development (DSWD). Built with Laravel and React using Inertia.js for seamless server-side rendering. Features include assistance program management, compliance tracking, approval workflows, beneficiary management with geographic mapping, file upload and document management, and real-time data visualization. Integrated Google Maps for location-based services and supports multi-user collaboration.',
            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
            techStack: ['Laravel', 'React', 'Inertia.js', 'Redux Toolkit', 'Tailwind CSS', 'Google Maps API', 'MySQL'],
            category: 'web',
            githubUrl: 'https://github.com/markleduna321/DSWD-WPMS',
            liveUrl: null,
            features: [
                'Welfare assistance program management',
                'Beneficiary registration and tracking',
                'Compliance monitoring and reporting',
                'Approval and release workflows',
                'Geographic mapping with Google Maps integration',
                'File upload and document management',
                'Multi-user collaboration with role-based access',
                'Real-time data visualization',
                'Program eligibility verification',
                'Export and reporting capabilities',
            ],
            codePreview: `// Inertia.js Laravel + React Integration
import { Head, useForm } from '@inertiajs/react';
import { useDispatch } from 'react-redux';

const AssistanceProgram = ({ programs, beneficiaries }) => {
  const { data, setData, post, processing } = useForm({
    program_id: '',
    beneficiary_id: '',
    amount: '',
    status: 'pending'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('assistance.store'), {
      onSuccess: () => {
        // Update Redux state
        dispatch(updateAssistanceList(data));
      }
    });
  };

  return (
    <>
      <Head title="Assistance Programs" />
      {/* Program management interface */}
    </>
  );
};`,
        },
        {
            id: 7,
            title: 'Information Management System',
            description: 'Enterprise-grade employee lifecycle and operations management platform',
            fullDescription: 'Designed a comprehensive unified Information Management System that serves as an all-in-one internal platform for managing the entire employee lifecycle and company operations. Features role-based access control for applicants, employees, and admins. Includes complete recruitment workflow from registration through AI-powered interviews to hiring decisions. Manages employee data, biometrics, payroll, ticketing, and HR services. Integrated communication tools include messaging with Company Bot and an Engagement Floor for internal social interaction. Built with a modern design system using #1329A9 primary blue, white cards, smooth animations, and floating labels throughout.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
            techStack: ['Figma', 'UI/UX Design', 'Design System', 'Prototyping'],
            category: 'design',
            githubUrl: null,
            liveUrl: 'https://www.figma.com/make/yTbTWMN6HRoFnZNUhwlEgZ/Design-Login-Page?p=f&t=pipmc7tdXQfnl6LV-0&fullscreen=1',
            features: [
                'Role-based access control (Applicants, Employees, Admins)',
                'Complete recruitment workflow with AI interview bot',
                'Employee lifecycle management from application to employment',
                'Biometric integration for attendance tracking',
                'Comprehensive payroll system',
                'Ticketing system for support and requests',
                'COE (Certificate of Employment) request management',
                'Recognition & Rewards (RnR) system',
                'Job posting and application management',
                'Internal messaging with Company Bot',
                'Engagement Floor - internal social platform',
                'Modern design system with #1329A9 blue primary color',
            ],
            codePreview: `/* Design System Specifications */

// Color Palette
Primary Blue: #1329A9 (Backgrounds)
White: #FFFFFF (Cards, Forms)
Text Primary: #1E293B
Text Secondary: #64748B

// Component Patterns
.floating-label {
  transition: all 0.3s ease;
  transform: translateY(-24px) scale(0.85);
}

.card-component {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.4s ease-out;
}

// Role-Based Routing
applicant -> /jobs/apply
employee -> /dashboard/restricted
admin -> /dashboard/full-access

// User Status Flow
registration -> applicant
ai_interview -> candidate
approval -> employee`,
        },
        {
            id: 8,
            title: 'Mekaniko E-Learning',
            description: 'Mobile learning platform for automotive and mechanical education',
            fullDescription: 'Developed an Android mobile application for automotive and mechanical skills education. Built with Android Studio using Java, this e-learning platform provides interactive lessons, tutorials, and practical guidance for aspiring mechanics and automotive technicians. Features include structured learning modules, multimedia content support, progress tracking, and offline access to educational materials. Designed to make automotive education accessible on mobile devices for students and professionals.',
            image: '/images/projects/e-lern.jpg',
            techStack: ['Java', 'Android Studio', 'Android SDK', 'XML'],
            category: 'mobile',
            githubUrl: 'https://github.com/markleduna321/mekaniko-e-learning',
            liveUrl: null,
            features: [
                'Structured learning modules for automotive mechanics',
                'Interactive tutorials and step-by-step guides',
                'Multimedia content support (images, videos, diagrams)',
                'Progress tracking and learning analytics',
                'Offline access to course materials',
                'Quiz and assessment features',
                'User-friendly mobile interface',
                'Modular course structure',
            ],
            codePreview: `// Android Activity Implementation
public class CourseActivity extends AppCompatActivity {
    private RecyclerView coursesRecyclerView;
    private CourseAdapter courseAdapter;
    private List<Course> courseList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_course);
        
        // Initialize RecyclerView
        coursesRecyclerView = findViewById(R.id.courses_recyclerview);
        coursesRecyclerView.setLayoutManager(
            new LinearLayoutManager(this)
        );
        
        // Load courses
        loadCourses();
        
        // Set up adapter
        courseAdapter = new CourseAdapter(courseList, this);
        coursesRecyclerView.setAdapter(courseAdapter);
    }
    
    private void loadCourses() {
        // Load course data from local database
        courseList = DatabaseHelper.getAllCourses();
    }
}`,
        },
    ];

    const categories = [
        { id: 'all', label: 'All Projects' },
        { id: 'web', label: 'Web Apps' },
        { id: 'mobile', label: 'Mobile' },
        { id: 'desktop', label: 'Desktop' },
        { id: 'ai', label: 'AI/ML' },
        { id: 'design', label: 'Design' },
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <section id="projects" className="py-20 relative overflow-hidden bg-gray-50/50 dark:bg-gray-900/50">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/5 dark:bg-primary-900/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/5 dark:bg-purple-900/20 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionTitle
                        title="Featured Projects"
                        subtitle="A showcase of my recent work and personal projects"
                    />
                </motion.div>

                {/* Filter Tabs */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((cat) => (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            key={cat.id}
                            onClick={() => setActiveFilter(cat.id)}
                            className={`
                                px-6 py-2.5 rounded-full font-medium transition-colors border backdrop-blur-md
                                ${activeFilter === cat.id
                                    ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/30'
                                    : 'bg-white/60 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }
                            `}
                        >
                            {cat.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                key={project.id}
                                className="h-full"
                            >
                                <motion.div whileHover={{ y: -10 }} className="h-full">
                                    <Card
                                        className="cursor-pointer h-full flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-white/10 overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 to-purple-500/0 group-hover:from-primary-500/5 group-hover:to-purple-500/5 transition-colors duration-500 z-0"></div>
                                        
                                        {/* Project Image */}
                                        <div className="relative overflow-hidden mb-4 h-48 bg-gray-100 dark:bg-gray-900 -mx-6 -mt-6 sm:-mx-6 sm:-mt-6">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>

                                        <div className="relative z-10 flex flex-col flex-grow">
                                            {/* Project Info */}
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                {project.title}
                                            </h3>

                                            <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 text-sm">
                                                {project.description}
                                            </p>

                                            <div className="mt-auto">
                                                {/* Tech Stack */}
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {project.techStack.slice(0, 3).map((tech) => (
                                                        <Badge key={tech} color="primary">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                    {project.techStack.length > 3 && (
                                                        <Badge color="secondary">
                                                            +{project.techStack.length - 3}
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setSelectedProject(project)}
                                                        className="flex-1 px-4 py-2.5 bg-gray-900 dark:bg-gray-700 hover:bg-primary-600 dark:hover:bg-primary-600 text-white rounded-xl transition-colors font-medium text-sm"
                                                    >
                                                        View Details
                                                    </button>
                                                    {project.githubUrl && (
                                                        <a
                                                            href={project.githubUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors border border-gray-200 dark:border-gray-700"
                                                            title="View on GitHub"
                                                        >
                                                            <CodeBracketIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                                        </a>
                                                    )}
                                                    {project.liveUrl && (
                                                        <a
                                                            href={project.liveUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors border border-gray-200 dark:border-gray-700"
                                                            title="View Live Demo"
                                                        >
                                                            <GlobeAltIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Project Detail Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <Modal
                            isOpen={!!selectedProject}
                            onClose={() => setSelectedProject(null)}
                            title={selectedProject.title}
                        >
                            <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
                                {/* Project Image */}
                                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-64 object-cover bg-gray-100 dark:bg-gray-900"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                                        About This Project
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {selectedProject.fullDescription}
                                    </p>
                                </div>

                                {/* Tech Stack */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                                        Technologies Used
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.techStack.map((tech) => (
                                            <Badge key={tech} color="primary" className="px-3 py-1">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Features */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                                        Key Features
                                    </h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {selectedProject.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                                                <span className="text-primary-500 mr-3 mt-0.5">●</span>
                                                <span className="text-gray-700 dark:text-gray-300 text-sm">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Code Preview */}
                                {selectedProject.codePreview && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                                            Code Snapshot
                                        </h3>
                                        <div className="code-preview rounded-xl border border-gray-200 dark:border-gray-700 shadow-inner">
                                            <pre className="text-sm text-gray-300 overflow-x-auto p-4 custom-scrollbar">
                                                <code>{selectedProject.codePreview}</code>
                                            </pre>
                                        </div>
                                    </div>
                                )}

                                {/* Links */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4 mt-6 border-t border-gray-100 dark:border-gray-800">
                                    {selectedProject.githubUrl && (
                                        <a
                                            href={selectedProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors shadow-md"
                                        >
                                            <CodeBracketIcon className="h-5 w-5" />
                                            View Source Code
                                            <ArrowTopRightOnSquareIcon className="h-4 w-4 opacity-70" />
                                        </a>
                                    )}
                                    {selectedProject.liveUrl && (
                                        <a
                                            href={selectedProject.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl hover:from-primary-700 hover:to-purple-700 transition-colors shadow-md shadow-primary-500/20"
                                        >
                                            <GlobeAltIcon className="h-5 w-5" />
                                            Visit Live Project
                                            <ArrowTopRightOnSquareIcon className="h-4 w-4 opacity-70" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </Modal>
                    )}
                </AnimatePresence>
            </div>
            
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(156, 163, 175, 0.5);
                    border-radius: 10px;
                }
            `}</style>
        </section>
    );
}
