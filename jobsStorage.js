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
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];

  if (savedJobs.length === 0) {
    container.innerHTML = "<p>No saved jobs.</p>";
    return;
  }

  container.innerHTML = "<h3>Saved Jobs:</h3>";
  savedJobs.forEach((job, index) => {
    const div = document.createElement('div');
    div.classList.add('saved-job');
    div.innerHTML = `
      <strong>${job.jobTitle}</strong><br>
      Customer: ${job.customerInfo}<br>
      Items: ${job.items.length}<br>
      Total: $${job.total.toFixed(2)}<br>
      Notes: ${job.jobNotes}<br>
      <button onclick="deleteJob(${index})">Delete</button>
      <hr>
    `;
    container.appendChild(div);
  });
}

function deleteJob(index) {
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
  savedJobs.splice(index, 1);
  localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  displaySavedJobs(document.getElementById('savedJobsContainer'));
}
