let jobsVisible = false;

function saveJob() {
  const jobData = {
    jobTitle: document.getElementById('jobTitle').value,
    customerInfo: document.getElementById('customerInfo').value,
    items: cart,
    laborCharge,
    discount: parseFloat(document.getElementById('discount').value) || 0,
    taxRate: parseFloat(document.getElementById('taxRate').value) || 0,
    total: parseFloat(document.getElementById('summaryTotal').textContent.replace(/[^\d.]/g, '')) || 0,
    jobNotes: document.getElementById('jobNotes').value
  };

  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
  savedJobs.push(jobData);
  localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  showMessage("Job saved locally!");
}

function toggleSavedJobs() {
  jobsVisible = !jobsVisible;
  const container = document.getElementById('savedJobsContainer');
  if (jobsVisible) {
    displaySavedJobs(container);
  } else {
    container.innerHTML = "";
  }
}

function displaySavedJobs(container) {
  container.innerHTML = '';
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');

  if (savedJobs.length === 0) {
    container.innerHTML = '<p>No saved jobs found.</p>';
    return;
  }

  savedJobs.forEach((job, index) => {
    const jobDiv = document.createElement('div');
    jobDiv.className = 'saved-job';
    jobDiv.innerHTML = `
      <h4>${job.customerInfo}</h4>
      <p><strong>Description:</strong> ${job.jobTitle}</p>
      <p><strong>Labor:</strong> ${job.laborCharge} hours</p>
      <p><strong>Total:</strong> $${job.total.toFixed(2)}</p>
      <p><strong>Notes:</strong> ${job.jobNotes || "None"}</p>
      <button onclick="deleteJob(${index})">Delete</button>
      <hr>
    `;
    container.appendChild(jobDiv);
  });
}


function deleteJob(index) {
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
  savedJobs.splice(index, 1);
  localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  displaySavedJobs(document.getElementById('savedJobsContainer'));
}
