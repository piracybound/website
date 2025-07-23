import ResourceCard from './ResourceCard';
import type { Resource } from '@/types';

interface ResourceGridProps {
  resources: Resource[];
  onResourceClick?: (resource: Resource) => void;
}

const ResourceGrid: React.FC<ResourceGridProps> = ({ resources, onResourceClick }) => {
  if (!resources || resources.length === 0) {
    return (
      <div className="no-results">
        <p>No resources found in this section.</p>
      </div>
    );
  }

  return (
    <div className="resources-grid">
      {resources.map((resource, index) => (
        <ResourceCard
          key={resource.id || `${resource.title}-${index}`}
          resource={resource}
          onClick={onResourceClick ? () => onResourceClick(resource) : undefined as unknown as () => void}
        />
      ))}
    </div>
  );
};

export default ResourceGrid;