import React from 'react';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Medicalhistory/VitalSigns.css';
import { Chart, registerables } from 'chart.js';
import { useLocation } from 'react-router-dom';
import '../Medicalhistory/VitalSigns.css';
Chart.register(...registerables);

const VitalSigns = () => {
  const location = useLocation();
  const vitalsRes = location.state?.vitals;
  const vitals=[vitalsRes] // Access the vitals data passed from AddDevice

  if (!vitals) {
    return <div>No vital signs data available.</div>;
  }

  // Assuming `vitals` is an object with relevant properties
  const labels = vitals.map(v => new Date().toLocaleDateString()); // Assuming each vital has a timestamp

  // Heart Rate Data
  const heartRateData = vitals.map(v => v.heartRate);
  const heartRateLineChartData = {
    labels,
    datasets: [
      {
        label: 'Heart Rate',
        data: heartRateData,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  // Temperature Data
  const temperatureData = vitals.map(v => v.temperature);
  const temperatureLineChartData = {
    labels,
    datasets: [
      {
        label: 'Temperature',
        data: temperatureData,
        fill: false,
        borderColor: 'rgba(255, 206, 86, 1)',
        tension: 0.1,
      },
    ],
  };

  // Oxygen Saturation Data
  const oxygenSaturationData = vitals.map(v => v.oxygenSaturation);
  const oxygenLineChartData = {
    labels,
    datasets: [
      {
        label: 'Oxygen Saturation',
        data: oxygenSaturationData,
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1,
      },
    ],
  };

  // Blood Pressure Data
  const systolicData = [];
  const diastolicData = [];

  vitals.forEach(v => {
    if (v.bloodPressure) {
      const [systolic, diastolic] = v.bloodPressure.split('/').map(Number);
      systolicData.push(systolic);
      diastolicData.push(diastolic);
    } else {
      systolicData.push(0);
      diastolicData.push(0);
    }
  });

  const bloodPressureLineChartData = {
    labels,
    datasets: [
      {
        label: 'Systolic Blood Pressure',
        data: systolicData,
        fill: false,
        borderColor: 'rgba(255, 0, 0, 1)', // Red for systolic
        tension: 0.1,
      },
      {
        label: 'Diastolic Blood Pressure',
        data: diastolicData,
        fill: false,
        borderColor: 'rgba(0, 128, 0, 1)', // Green for diastolic
        tension: 0.1,
      },
    ],
  };

  // Respiratory Rate Data
  const respiratoryRateData = vitals.map(v => v.respiratoryRate);
  const respiratoryLineChartData = {
    labels,
    datasets: [
      {
        label: 'Respiratory Rate',
        data: respiratoryRateData,
        fill: false,
        borderColor: 'rgba(255, 159, 64, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="vital-signs-container mb-4" style={{ width: '80%', margin: '0 auto' }}>
      <h1 className="vital-signs-title mb-4">Vital Signs</h1>

      <div className="row">
        <div className="col-md-4">
          <h1>Heart Rate</h1>
          <div style={{ width: '400px', height: '300px' }}>
            <Line data={heartRateLineChartData} options={{ responsive: true, plugins: { legend: { display: true, position: 'top' } }, scales: { y: { beginAtZero: true } } }} />
          </div>
        </div>

        <div className="col-md-4">
          <h1>Temperature</h1>
          <div style={{ width: '400px', height: '300px' }}>
            <Line data={temperatureLineChartData} options={{ responsive: true, plugins: { legend: { display: true, position: 'top' } }, scales: { y: { beginAtZero: true } } }} />
          </div>
        </div>

        <div className="col-md-4">
          <h1>Oxygen Saturation</h1>
          <div style={{ width: '400px', height: '300px' }}>
            <Line data={oxygenLineChartData} options={{ responsive: true, plugins: { legend: { display: true, position: 'top' } }, scales: { y: { beginAtZero: true } } }} />
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <h1>Blood Pressure</h1>
          <div style={{ width: '400px', height: '300px' }}>
            <Line data={bloodPressureLineChartData} options={{ responsive: true, plugins: { legend: { display: true, position: 'top' } }, scales: { y: { beginAtZero: true } } }} />
          </div>
        </div>

        <div className="col-md-4">
          <h1>Respiratory Rate</h1>
          <div style={{ width: '400px', height: '300px' }}>
            <Line data={respiratoryLineChartData} options={{ responsive: true, plugins: { legend: { display: true, position: 'top' } }, scales: { y: { beginAtZero: true } } }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalSigns;
