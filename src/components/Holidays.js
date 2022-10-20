// import react use state use effect
import React, {useState, useEffect} from "react";

// import axios
import axios from "axios";

// holiday component
const Holidays = () => {
    // is loading set is loading
    const [isLoading, setIsLoading] = useState(true);

    // vacations set vacations
    const [vacations, setVacations] = useState([]);

    // active slide
    const [activeSlide, setActiveSlide] = useState(0);

    // get vacations
    const getVacations = () => {
        // axios
        axios.get("https://react--course-api.herokuapp.com/api/v1/data/vacanze")
        .then((res) => {
            // set vacations
            setVacations(res.data.data);

            // set is loading false
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
            // set is loading false
            setIsLoading(false);
        })
    }

    // use effect get vacations
    useEffect(() => {
        getVacations();
    }, [])

    // nextslide
    const nextSlide = () => (e) => {
        setActiveSlide((activeSlide) => {
            if(activeSlide + 1 === vacations.length) {
                return 0;
            } else {
                return activeSlide + 1;
            }
        });
    }

    // prev slide
    const prevSlide = () => (e) => {
        setActiveSlide((activeSlide) => {
            if(activeSlide - 1 === -1) {
                return vacations.length - 1;
            } else {
                return activeSlide - 1;
            }
        });
    }

    return (
        <div className="holidays">
            <div className="container pt-5">

                {/* row 1 */}
                <div className="row justify-content-center mb-4">
                    <div className="col-12 text-center">
                        {/* title */}
                        <h1>Slider Vacanze</h1>
                    </div>
                </div>

                {/* row 2 */}
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">

                        {!isLoading ? (
                            <div className="card bg-dark shadow-lg d-flex h-100 pb-4">
                                {/* vacations map */}
                                {vacations.length ? vacations.map((vacation, index) => {
                                    return(
                                        <div className={`wrapper h-100 ${activeSlide === index ? 'd-block' : 'd-none'}`} key={vacation.id}>
                                            <figure className="vacation_img">
                                                <img src={vacation.img} className="figure-img img-fluid rounded" alt="..." />
                                            </figure>

                                            {/* description */}
                                            <div className="description px-4">
                                                <h3 className="title mb-3">{vacation.titolo}</h3>
                                                <p>{vacation.descrizione}</p>

                                                <div className="d-flex justify-content-between">
                                                    <p className="fs-6">{vacation.durata}</p>
                                                    <p className="fs-6 text-info fw-bold">{(vacation.prezzo / 100).toFixed(2)} &euro;</p>
                                                </div>
                                            </div>

                                            {/* btn */}
                                            <div className="buttons d-flex justify-content-between align-items-center px-4">
                                                {/* btn prev slide */}
                                                <button onClick={prevSlide()} type="button" className="btn btn-info">prev</button>

                                                {/* btn next slide */}
                                                <button onClick={nextSlide()} type="button" className="btn btn-info">next</button>
                                            </div>
                                        </div>
                                    )
                                }) : <h4 className="text-center pt-4">Non ci sono vacanze</h4>}
                            </div>
                        ) : <h4 className="text-center">Loading..</h4>}
                    </div>
                </div>

            </div>
        </div>
    )
}

// export holydays component
export default Holidays;