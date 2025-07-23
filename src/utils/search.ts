import type { Resource, SearchSuggestion } from '@/types';

export const generateSearchSuggestions = (
  searchTerm: string,
  resources: Resource[],
  categories: string[],
  maxSuggestions = 10
): SearchSuggestion[] => {
  const suggestions: SearchSuggestion[] = [];
  const searchLower = searchTerm.toLowerCase();

  if (searchTerm.length < 2) return suggestions;

  const features = new Set<string>();
  const badges = new Set<string>();

  resources.forEach(resource => {
    resource.features?.forEach(feature => features.add(feature));
    resource.badges?.forEach(badge => badges.add(badge));
  });

  resources
    .filter(resource =>
      resource.title.toLowerCase().includes(searchLower) ||
      resource.description?.toLowerCase().includes(searchLower) ||
      resource.features?.some(feature => feature.toLowerCase().includes(searchLower))
    )
    .slice(0, Math.floor(maxSuggestions / 2))
    .forEach(resource => {
      suggestions.push({
        text: resource.title,
        type: 'resource',
        count: 1
      });
    });

  categories
    .filter(category => category.toLowerCase().includes(searchLower))
    .slice(0, 3)
    .forEach(category => {
      suggestions.push({
        text: category.replace('-', ' › '),
        type: 'category',
        count: 1
      });
    });

  Array.from(features)
    .filter(feature => feature.toLowerCase().includes(searchLower))
    .slice(0, 3)
    .forEach(feature => {
      const count = resources.filter(r => r.features?.includes(feature)).length;
      suggestions.push({
        text: feature,
        type: 'feature',
        count
      });
    });

  Array.from(badges)
    .filter(badge => badge.toLowerCase().includes(searchLower))
    .slice(0, 2)
    .forEach(badge => {
      const count = resources.filter(r => r.badges?.includes(badge as any)).length;
      suggestions.push({
        text: badge,
        type: 'badge',
        count
      });
    });

  return suggestions.slice(0, maxSuggestions);
};