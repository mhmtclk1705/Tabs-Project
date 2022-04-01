import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";
function App() {
  // fetch aşamasında loading yazısı dönsün fetch edildiği anda loading yazısı gitsin
  const [loading, setLoading] = useState(true);
  // fetch edilen verileri tutacak state
  const [jobs, setJobs] = useState([]);
  // data elemanları
  const [value, setValue] = useState(0);

  // fetch aşaması
  const fetchJobs = async () => {
    const res = await fetch(url);
    const newJobs = await res.json();
    setJobs(newJobs);
    // fetch edildikten sonra loading kalksın
    setLoading(false);
    
  };
  // console.log(jobs);
  // useEffect ile sayfa her yüklendiğinde fetch edilsin
  useEffect(() => {
    fetchJobs();
  }, []);

    // eğer loading true ise loading yazısı dönsün 
  if (loading) {
    return (
      <section className="section loading">
        <h1>loading...</h1>
      </section>
    );
  }
  // error almamak için altta tanımladık
  // destructuring
  const { company, dates, duties, title } = jobs[value];
  return (
    // html css
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {/* jobs içerisinde valueları değiştirmek adına map ile gezdik */}
          {jobs.map((item, index) => {
            return (
              <button
                key={item.id}
                // tıkladığımız buton valuesu setValue ile value ye atanıyor bize o value ya ait bilgiler görünüyor
                onClick={() => setValue(index)}
                // eğer tıklanıılan buton indeks i value ile eşitse actif olacak ve altı çizili bir görüntüsü olacak
                className={`job-btn ${index === value && "active-btn"}`}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {/* duties içerisinde map ile dönüp descriptionları yazdırdık */}
          {duties.map((duty, index) => {
            return (
              <div className="job-desc" key={index}>
                <FaAngleDoubleRight classNamejob-icon />
                {duty}
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default App;
