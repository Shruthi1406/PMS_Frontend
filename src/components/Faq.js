import "./faq.css";

function Faqs() {
    return (
    <div className="container">
        <h1 className="d-flex justify-content-start faq">FAQ</h1>
        <div className="container border rounded mb-5" >
        <div className="accordion accordion-flush mt-4" id="accordionFlushExample" style={{ margin: '20px' }}>
          {/* First Accordion Item */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button collapsed "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                <h3><b>What is Online Consultation?</b></h3>
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                An online doctor consultation happens over an online doctor chat, call, or video call. This enables you
                to talk to doctors online without having to search or locate a clinic or hospital near you. You can now
                opt for an online medical consultation by simply selecting a doctor from various specialties from the
                comfort of your home, without dealing with the hassle of waiting in traffic or long queues.
              </div>
            </div>
          </div>
   
          {/* Second Accordion Item */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingTwo">
              <button
                className="accordion-button collapsed custom-accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                <h3><b>How do I do an online consultation?</b></h3>
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                The steps to talk to a doctor online are simple:<br />
                1. Contact us by visiting our website or downloading the MFine app for doctor consultation.<br />
                2. Choose your symptoms or select a specialist doctor to consult. You can even consult a general
                physician who can understand your condition better.<br />
                3. Book a doctor appointment online and a specialist will get in touch with you immediately.<br />
                4. Ask a doctor online about your symptoms, problems, condition, medication, and more during your
                consultation.<br />
                5. Online doctor consultation at MFine may require you to submit previous medical records, lab results,
                etc. so the doctor can better understand your condition.<br />
                6. Post the teleconsultation, you can get follow-ups with your doctor.<br />
                7. You can also order medicines online from the MFine app.<br />
                8. You can also get lab tests done at home.
              </div>
            </div>
          </div>
   
          {/* Third Accordion Item */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingThree">
              <button
                className="accordion-button collapsed custom-accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                <h3><b>Which online doctor should I see?</b></h3>
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                If you are aware of your condition, you should consult with a doctor of the specialty your condition
                falls under. For example, if you suffer from back pain or fracture, you should see an orthopedician. If
                you suffer from irregular periods, you should consult a gynecologist. But if you are unable to understand
                your symptoms, it will be best to consult a general physician.
              </div>
            </div>
          </div>
   
          {/* Fourth Accordion Item */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingFour">
              <button
                className="accordion-button collapsed custom-accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFour"
                aria-expanded="false"
                aria-controls="flush-collapseFour"
              >
                <h3><b>Can I choose a specific doctor to consult with?</b></h3>
              </button>
            </h2>
            <div
              id="flush-collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingFour"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                Yes, you can avail of online consultation with a doctor of your choice. With multiple doctors in various
                specialties and cities, you can select a doctor based on their profile.
              </div>
            </div>
          </div>
   
          {/* Fifth Accordion Item */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingFive">
              <button
                className="accordion-button collapsed custom-accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFive"
                aria-expanded="false"
                aria-controls="flush-collapseFive"
              >
                <h3><b>Is my online medical consultation secure?</b></h3>
              </button>
            </h2>
            <div
              id="flush-collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingFive"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                With MFine, you can consult a doctor online without having to worry about privacy. We ensure that your
                interaction with a doctor online remains confidential.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

export default Faqs;
   