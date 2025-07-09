// Save job data to localStorage
function saveJobData(jobData) {
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
  savedJobs.push(jobData);
  localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
}

// Get saved jobs from localStorage
function getSavedJobs() {
  return JSON.parse(localStorage.getItem('savedJobs')) || [];
}

// Delete a job by index
function deleteJob(index) {
  const savedJobs = getSavedJobs();
  savedJobs.splice(index, 1);
  localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  displaySavedJobs('savedJobsContainer'); // Refresh display
}

// Display jobs in a container
let isJobsVisible = false;

function displaySavedJobs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return alert("Missing container: " + containerId);

  if (isJobsVisible) {
    container.innerHTML = ""; // Hide the jobs
    isJobsVisible = false;
    return;
  }

  const savedJobs = getSavedJobs();
  if (savedJobs.length === 0) {
    container.innerHTML = "<p>No saved jobs.</p>";
    isJobsVisible = true;
    return;
  }

  let output = "<h3>Saved Jobs:</h3>";

  savedJobs.forEach((job, index) => {
    output += `<div style="border:1px solid #ccc; margin:10px; padding:10px;">
      <strong>Job #${index + 1}</strong><br>
      Title: ${job.jobTitle}<br>
      Customer: ${job.customerInfo}<br>
      Total: $${job.total.toFixed(2)}<br>
      Saved: ${new Date(job.savedAt).toLocaleString()}<br>
      Notes: ${job.jobNotes}<br>
      Items: ${job.items.map(i => `${i.item} x${i.quantity}`).join(', ')}<br>
      <button onclick="deleteJob(${index})">Delete</button>
    </div>`;
  });

  container.innerHTML = output;
  isJobsVisible = true;
}
