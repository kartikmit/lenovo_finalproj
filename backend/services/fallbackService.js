export const generateFallbackRoadmap = (topic) => {
  return [
    {
      title: `Basics of ${topic}`,
      description: `Learn the fundamentals`,
      resources: [`Search basics`],
      isDone: false
    },
    {
      title: `Advanced ${topic}`,
      description: `Deep dive into concepts`,
      resources: [`Search advanced docs`],
      isDone: false
    }
  ];
};