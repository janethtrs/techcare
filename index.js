
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
    history(data);
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
      class="moreIcon"
    />
  </div>
      `;
      patientDiv.innerHTML= patientInfo;
      user.appendChild(patientDiv);
    })
  }

function abbreviateMonth(month) {
    const monthAbbreviations = {
      October: "Oct",
      November: "Nov",
      December: "Dec",
      January: "Jan",
      February: "Feb",
      March: "Mar",
    };

    return monthAbbreviations[month] || month; // Devuelve la abreviatura o el mes original si no se encuentra en el objeto
}
  function history(diagnosis,date,blood_pressure_diastolic,blood_pressure_systolic){
    const ctx = document.getElementById('myChart');

    blood_pressure_diastolic = 
    [
      diagnosis[3].diagnosis_history[5].blood_pressure.diastolic.value,
      diagnosis[3].diagnosis_history[4].blood_pressure.diastolic.value,
      diagnosis[3].diagnosis_history[3].blood_pressure.diastolic.value,
      diagnosis[3].diagnosis_history[2].blood_pressure.diastolic.value,
      diagnosis[3].diagnosis_history[1].blood_pressure.diastolic.value,
      diagnosis[3].diagnosis_history[0].blood_pressure.diastolic.value,
    ]
    blood_pressure_systolic =
    [
      diagnosis[3].diagnosis_history[5].blood_pressure.systolic.value,
      diagnosis[3].diagnosis_history[4].blood_pressure.systolic.value,
      diagnosis[3].diagnosis_history[3].blood_pressure.systolic.value,
      diagnosis[3].diagnosis_history[2].blood_pressure.systolic.value,
      diagnosis[3].diagnosis_history[1].blood_pressure.systolic.value,
      diagnosis[3].diagnosis_history[0].blood_pressure.systolic.value,
    ]
    dates = 
    [
    diagnosis[3].diagnosis_history[5].month+ ', '+diagnosis[3].diagnosis_history[5].year,
    diagnosis[3].diagnosis_history[4].month+ ', '+diagnosis[3].diagnosis_history[4].year,
    diagnosis[3].diagnosis_history[3].month+ ', '+diagnosis[3].diagnosis_history[3].year,
    diagnosis[3].diagnosis_history[2].month+ ', '+diagnosis[3].diagnosis_history[2].year,
    diagnosis[3].diagnosis_history[1].month+ ', '+diagnosis[3].diagnosis_history[1].year,
    diagnosis[3].diagnosis_history[0].month+ ', '+diagnosis[3].diagnosis_history[0].year,
    ]

    const formattedDates = dates.map(date=> {
      const [fullMonthName, year] = date.split(', ');
      const abbreviateMonthName = abbreviateMonth(fullMonthName.trim());
      return abbreviateMonthName + ', ' + year;
    })

    new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Blood pressure diastolic',
                data: blood_pressure_diastolic,
            }, {
                type: 'line',
                label: 'Blood pressure systolic',
                data: blood_pressure_systolic,
            }],
            labels:formattedDates
        },
    });
  };
