import yaml from 'js-yaml';

export const validateYaml = (content: string): boolean => {
  try {
    yaml.load(content);
    return true;
  } catch (error) {
    return false;
  }
}; 