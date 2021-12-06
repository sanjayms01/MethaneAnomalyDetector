import React, { Component } from 'react'

export default class TeamCards extends Component {

    constructor(props) {
        super(props);
        this.team = [
            {
                name: "Sanjay Saravanan",
                img_link:  "https://raw.githubusercontent.com/sanjayms01/MethaneAnomalyDetector/develop/frontend/src/assets/img/team/sanjay.jpg",
                job:  "Software Engineer",
                company: "Adobe",
                linkedIn: "https://www.linkedin.com/in/sanjaysaravanan1/",
                github: "https://github.com/sanjayms01"
            },
            {
                name: "Karthik Rameshbabu",
                img_link:  "https://github.com/sanjayms01/MethaneAnomalyDetector/blob/develop/frontend/src/assets/img/team/karthik.png?raw=true",
                job:  "Senior Software Engineer",
                company: "JioSaavn, Machine Learning & AI",
                linkedIn: "https://www.linkedin.com/in/karthikrbabu/",
                github: "https://github.com/karthikrbabu"
            },
            {
                name: "C.S. John Lee",
                img_link:  "https://raw.githubusercontent.com/sanjayms01/MethaneAnomalyDetector/develop/frontend/src/assets/img/team/john.jpg",
                job:  "Mechanical Engineer",
                company: "Air Systems Engineering, Inc.",
                linkedIn: "https://www.linkedin.com/in/csjohnlee/",
                github: "https://github.com/CSJohnLee"
            },
            {
                name: "Jaclyn Andrews",
                img_link:  "https://raw.githubusercontent.com/sanjayms01/MethaneAnomalyDetector/develop/frontend/src/assets/img/team/jaclyn.png",
                job:  "Director",
                company: "2U Inc., Marketing Strategy and Analysis",
                linkedIn: "https://www.linkedin.com/in/jandrews3201/",
                github: "https://github.com/jaclynandrews"
            },
            {
                name: "Alyssa Augsburger",
                img_link:  "https://raw.githubusercontent.com/sanjayms01/MethaneAnomalyDetector/develop/frontend/src/assets/img/team/alyssa.jpg",
                job:  "Senior Member of Technical Staff", 
                company: "Oracle",
                linkedIn: "https://www.linkedin.com/in/alyssaaugsburger/",
                github: "https://github.com/alyssaaugsburger"
            },
        ]

        this.getTeamCards = this.getTeamCards.bind(this);
        this.shuffle = this.shuffle.bind(this);
    }


    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      }
      
    getTeamCards() {
        let result = [];
        let index = 0;
        for (let member of this.shuffle(this.team)) {
            let {name, img_link, job, company, linkedIn, github} = member;
            result.push(
                <div key={index} className="col-lg-6 mt-4" data-aos="fade-up" data-aos-delay="300">
                    <div className="member d-flex align-items-center" style={{justifyContent: 'center', height: 256}}>
                        <div className="pic"><img src={img_link} className="img-fluid" alt=""></img></div>
                        <div className="member-info">
                            <h4>{name}</h4>
                            <span>{job}</span>
                            <p>{company}</p>
                            <div className="social">
                            <a href={linkedIn} target="_blank"> <i className="ri-linkedin-box-fill"></i> </a>
                            <a href={github} target="_blank"><i className="ri-github-fill"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            )
            index += 1;
        }

        result.push(
            <div className="col-lg-6 mt-4" data-aos="fade-up" style={{height: 600}} data-aos-delay="400">
                <div className="member d-flex align-items-center" style={{justifyContent: 'center', height: 256}}>
                    <div className="pic"><img src="https://raw.githubusercontent.com/sanjayms01/MethaneAnomalyDetector/2cf68f7fa452970e069cbdb072c303950d0bef0a/frontend/src/assets/img/madlogo.svg" className="img-fluid" alt=""></img></div>
                    <div className="member-info">
                        <h4 style={{textAlign: 'center'}}>Our Contact</h4>
                        <div className="social">
                            <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                            <a href=""><i className="ri-github-fill"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        )

        return result
    }

    render() {
        return (
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Team</h2>
                    <p>Our diverse data science teams comes from a variety of backgrounds grounded in environmental engineering, computer science, and product marketing.</p>
                </div>
                <div className="row">
                    {this.getTeamCards()}
                </div>
            </div>
        );
    }
}
