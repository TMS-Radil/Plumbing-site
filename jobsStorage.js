// Save job data to localStorage
function saveJobData(jobData) {
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
  savedJobs.push(jobData);
  localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
}

// Get all saved jobs from localStorage
function getSavedJobs() {
  return JSON.parse(localStorage.getItem('savedJobs')) || [];
}

// Display saved jobs inside a container element by ID
function displaySavedJobs(containerId) {
  const savedJobs = getSavedJobs();
  if (savedJobs.length === 0) {
    alert("No saved jobs yet.");
    return;
  }

  let output = "<h3>Saved Jobs:</h3>";

  savedJobs.forEach((job, index) => {
    output += `<div style="border:1px solid #ccc; margin:10px; padding:10px;">
      <strong>Job #${index + 1}</strong><br>
      Title: ${job.jobTitle}<br>
      Customer: ${job.customerInfo}<br>
      Total: $${job.total.toFixed(2)}<br>
      Saved at: ${new Date(job.savedAt).toLocaleString()}<br>
      Notes: ${job.jobNotes}<br>
      Items: ${job.items.map(i => `${i.item} x${i.quantity}`).join(', ')}
    </div>`;
  });

  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = output;
  } else {
    alert("Container not found: " + containerId);
  }
}

function saveJob() {
  const jobData = {
    jobTitle: document.getElementById('jobTitle').value,
    customerInfo: document.getElementById('customerInfo').value,
    items: cart, // assuming this is your global cart array
    laborCharge,
    discount: parseFloat(document.getElementById('discount').value) || 0,
    taxRate: parseFloat(document.getElementById('taxRate').value) || 0,
    total: parseFloat(document.getElementById('summaryTotal').textContent.replace(/[^\d.]/g, '')) || 0,
    jobNotes: document.getElementById('jobNotes').value,
    savedAt: new Date().toISOString()
  };

  saveJobData(jobData); // <-- Call function from jobsStorage.js

  showMessage("Job saved locally!");
}

function viewSavedJobs() {
  displaySavedJobs('savedJobsContainer'); // Pass the ID of the container to render jobs
}
