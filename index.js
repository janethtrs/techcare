
const myHeaders = new Headers();
myHeaders.append("Authorization", "Basic Y29hbGl0aW9uOnNraWxscy10ZXN0");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://fedskillstest.coalitiontechnologies.workers.dev", requestOptions)
  .then((response) => response.json())
  .then(data => {
    patients(data);
  })
  .catch((error) => console.error(error));

  function patients(users){
    const user = document.getElementById('patientProfile');

    users.forEach(patient => {
      const patientDiv = document.createElement('div');
      patientDiv.className = 'patient';

      const patientInfo =
      `
      <div class="patient-profile">
    <img src="${patient.profile_picture}" width="48" height="48" alt="profileImage" />
    <div class="labels">
      <label>${patient.name}</label>
      <label class="job">${patient.gender},${patient.age}</label>
    </div>
    <img
      width="18"
      height="4"
      src="/Pictures/morehorizontalIcon.svg"
      alt="morehorizontalIcon"
    />
  </div>
      `;
      patientDiv.innerHTML= patientInfo;
      user.appendChild(patientDiv);
    })
  }