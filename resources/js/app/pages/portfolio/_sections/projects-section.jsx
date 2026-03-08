import { useState } from 'react';
import { useSelector } from 'react-redux';
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
            title: 'E-Commerce Platform',
            description: 'A full-featured online shopping platform with payment integration',
            fullDescription: 'Built a comprehensive e-commerce solution featuring product catalog, cart management, secure payment processing with Stripe, order tracking, and admin dashboard. Implemented real-time inventory updates and email notifications.',
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
            techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
            category: 'web',
            githubUrl: 'https://github.com/username/ecommerce',
            liveUrl: 'https://demo.example.com',
            features: [
                'User authentication and authorization',
                'Product search and filtering',
                'Shopping cart with persistent state',
                'Stripe payment integration',
                'Order management system',
                'Admin dashboard for inventory',
            ],
            codePreview: `// Product Card Component
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  
  const addToCart = () => {
    dispatch(addProduct(product));
  };
  
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">\${product.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};`,
        },
        {
            id: 2,
            title: 'Task Management Dashboard',
            description: 'Collaborative project management tool with real-time updates',
            fullDescription: 'Developed a Kanban-style task management application with drag-and-drop functionality, real-time collaboration using WebSockets, team management, and detailed analytics.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
            techStack: ['React', 'Laravel', 'MySQL', 'Socket.io', 'Tailwind CSS'],
            category: 'web',
            githubUrl: 'https://github.com/username/task-manager',
            liveUrl: 'https://tasks.example.com',
            features: [
                'Drag-and-drop task boards',
                'Real-time collaboration',
                'Team and project management',
                'File attachments',
                'Activity timeline',
                'Advanced filtering and search',
            ],
            codePreview: `// WebSocket Task Update
socket.on('taskUpdated', (updatedTask) => {
  dispatch(updateTask(updatedTask));
  
  toast.success(\`Task "\${updatedTask.title}" updated\`);
});

const moveTask = (taskId, newStatus) => {
  socket.emit('updateTask', {
    id: taskId,
    status: newStatus,
  });
};`,
        },
        {
            id: 3,
            title: 'AI Content Generator',
            description: 'AI-powered content creation tool using GPT-4',
            fullDescription: 'Created an intelligent content generation platform leveraging OpenAI\'s GPT-4 API. Features include blog post generation, social media captions, SEO optimization suggestions, and content scheduling.',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
            techStack: ['Next.js', 'Python', 'FastAPI', 'OpenAI', 'PostgreSQL'],
            category: 'ai',
            githubUrl: 'https://github.com/username/ai-content',
            liveUrl: 'https://ai-content.example.com',
            features: [
                'GPT-4 integration',
                'Multiple content types',
                'SEO optimization',
                'Content scheduling',
                'Template library',
                'Analytics dashboard',
            ],
            codePreview: `// AI Content Generation
const generateContent = async (prompt, type) => {
  const response = await openai.createCompletion({
    model: "gpt-4",
    prompt: \`Generate \${type}: \${prompt}\`,
    max_tokens: 1000,
    temperature: 0.7,
  });
  
  return response.data.choices[0].text;
};`,
        },
        {
            id: 4,
            title: 'Real Estate Finder',
            description: 'Property search platform with map integration',
            fullDescription: 'Developed a comprehensive real estate platform with interactive maps, advanced filtering, virtual tours, mortgage calculator, and agent matching system.',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
            techStack: ['React', 'Laravel', 'Google Maps API', 'MySQL'],
            category: 'web',
            githubUrl: 'https://github.com/username/real-estate',
            liveUrl: 'https://realestate.example.com',
            features: [
                'Interactive map search',
                'Advanced property filters',
                '360° virtual tours',
                'Mortgage calculator',
                'Saved searches and favorites',
                'Agent messaging system',
            ],
            codePreview: `// Map Component with Markers
const PropertyMap = ({ properties }) => {
  return (
    <GoogleMap zoom={12} center={defaultCenter}>
      {properties.map(property => (
        <Marker
          key={property.id}
          position={{
            lat: property.latitude,
            lng: property.longitude
          }}
          onClick={() => selectProperty(property)}
        />
      ))}
    </GoogleMap>
  );
};`,
        },
        {
            id: 5,
            title: 'Mobile Fitness Tracker',
            description: 'Cross-platform fitness tracking mobile app',
            fullDescription: 'Built a comprehensive fitness tracking application with workout logging, nutrition tracking, progress analytics, social features, and wearable device integration.',
            image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
            techStack: ['React Native', 'Node.js', 'MongoDB', 'HealthKit'],
            category: 'mobile',
            githubUrl: 'https://github.com/username/fitness-tracker',
            liveUrl: null,
            features: [
                'Workout logging and tracking',
                'Nutrition database',
                'Progress charts and analytics',
                'Social features and challenges',
                'Wearable device sync',
                'Custom workout plans',
            ],
            codePreview: `// Track Workout Hook
const useWorkoutTracker = () => {
  const [workout, setWorkout] = useState(null);
  
  const startWorkout = (type) => {
    setWorkout({
      type,
      startTime: Date.now(),
      exercises: [],
    });
  };
  
  const logExercise = (exercise) => {
    setWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, exercise]
    }));
  };
  
  return { workout, startWorkout, logExercise };
};`,
        },
        {
            id: 6,
            title: 'Blockchain Voting System',
            description: 'Secure voting platform using blockchain technology',
            fullDescription: 'Developed a decentralized voting system ensuring transparency and security using Ethereum smart contracts. Features include voter verification, real-time results, and immutable vote records.',
            image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800',
            techStack: ['React', 'Solidity', 'Ethereum', 'Web3.js', 'IPFS'],
            category: 'blockchain',
            githubUrl: 'https://github.com/username/blockchain-voting',
            liveUrl: 'https://vote.example.com',
            features: [
                'Smart contract voting',
                'MetaMask integration',
                'Immutable vote records',
                'Real-time results',
                'Voter verification',
                'IPFS candidate data storage',
            ],
            codePreview: `// Smart Contract Interaction
const castVote = async (candidateId) => {
  const contract = new web3.eth.Contract(
    votingABI,
    contractAddress
  );
  
  await contract.methods
    .vote(candidateId)
    .send({ from: account });
    
  toast.success('Vote cast successfully!');
};`,
        },
    ];

    const categories = [
        { id: 'all', label: 'All Projects' },
        { id: 'web', label: 'Web Apps' },
        { id: 'mobile', label: 'Mobile' },
        { id: 'ai', label: 'AI/ML' },
        { id: 'blockchain', label: 'Blockchain' },
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="Featured Projects"
                    subtitle="A showcase of my recent work and personal projects"
                />

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveFilter(cat.id)}
                            className={`
                                px-6 py-2 rounded-full font-medium transition-all
                                ${activeFilter === cat.id
                                    ? 'bg-primary-600 text-white shadow-lg'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }
                            `}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <Card
                            key={project.id}
                            className="cursor-pointer"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Project Image */}
                            <div className="relative overflow-hidden rounded-lg mb-4 h-48">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>

                            {/* Project Info */}
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {project.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-4">
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
                                    className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                                >
                                    View Details
                                </button>
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                        title="View on GitHub"
                                    >
                                        <CodeBracketIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                        title="View Live Demo"
                                    >
                                        <GlobeAltIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                                    </a>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Project Detail Modal */}
                {selectedProject && (
                    <Modal
                        isOpen={!!selectedProject}
                        onClose={() => setSelectedProject(null)}
                        title={selectedProject.title}
                    >
                        <div className="space-y-6">
                            {/* Project Image */}
                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                className="w-full h-64 object-cover rounded-lg"
                            />

                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                    About This Project
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
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
                                        <Badge key={tech} color="primary">
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
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {selectedProject.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="text-primary-600 mr-2">✓</span>
                                            <span className="text-gray-600 dark:text-gray-400">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Code Preview */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                                    Code Preview
                                </h3>
                                <div className="code-preview">
                                    <pre className="text-sm text-gray-300 overflow-x-auto">
                                        <code>{selectedProject.codePreview}</code>
                                    </pre>
                                </div>
                            </div>

                            {/* Links */}
                            <div className="flex gap-4 pt-4">
                                {selectedProject.githubUrl && (
                                    <a
                                        href={selectedProject.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        <CodeBracketIcon className="h-5 w-5" />
                                        View on GitHub
                                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                    </a>
                                )}
                                {selectedProject.liveUrl && (
                                    <a
                                        href={selectedProject.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                    >
                                        <GlobeAltIcon className="h-5 w-5" />
                                        View Live Demo
                                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </section>
    );
}
