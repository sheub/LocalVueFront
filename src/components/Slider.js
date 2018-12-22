import React, { Component } from "react";
import Slider from "react-slick";
import "./../slick.min.css";
import "./../slick-theme.min.css";
import Typography from "@material-ui/core/Typography";
import google from "./../assets/brands/google.svg"
import here from "./../assets/brands/here.svg"
import yelp from "./../assets/brands/yelp.svg"
import foursquare from "./../assets/brands/foursquare.svg"
import bing from "./../assets/brands/bing.svg"


export default class Responsive extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 3,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <div style={{ backgroundColor: "#d9d9d9", padding: "42px" }}>
                <div style={{ maxWidth: "1140px", margin: "auto", padding: "32px 0" }}>
                    <div style={{ paddingBottom: "72px" }}>
                        <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
                            Wo gefunden werden?
                        </Typography>
                    </div>
                    {/* <h2> Wo kann man gefunden werden? </h2> */}
                    <Slider {...settings}>
                        <div>
                            <img style={{ maxWidth: "52px", margin:"auto"}} src={here} alt="here" />
                        </div>
                        <div>
                            <img style={{ maxWidth: "52px", margin:"auto" }} src={yelp} alt="yelp" />
                        </div>
                        <div>
                            <img style={{ maxWidth: "52px", margin:"auto" }} src={foursquare} alt="foursquare" />
                        </div>
                        <div>
                            <img style={{ maxWidth: "52px", margin:"auto" }} src={bing} alt="bing" />
                        </div>
                        <div>
                            <img style={{ maxWidth: "52px", margin:"auto" }} src={google} alt="Google" />
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}