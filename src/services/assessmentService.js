export async function fetchAssessment(skills) {
  try {
    const queryParams = skills.map(skill => `skills=${encodeURIComponent(skill)}`).join('&');
    const response = await fetch(`http://192.168.83.178:8000/api/jobseeker/generate-assessment?${queryParams}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response.data)

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching assessment:', error);
    throw error;
  }
}

export async function fetchReactUITask(request) {
  try {
    const response = await fetch('http://192.168.83.178:8000/api/jobseeker/react-ui-task', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ui_type: "string",
        features: [
          "responsive",
          "dark-mode"
        ],
        difficulty: "medium",
        description: "string"
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching React UI task:', error);
    throw error;
  }
} 