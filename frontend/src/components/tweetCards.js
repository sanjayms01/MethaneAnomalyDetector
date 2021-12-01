import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default class TweetCards extends Component {

    constructor(props) {
        super(props);
    }

    getTweetElements(tweetsData) {
        console.log("TWEET DATA:", tweetsData);
        let result = [];
        let index = 0;
        for (let obj of tweetsData) {
            let created_at = obj.created_at;
            let text = obj.text;
            let id = obj.id;
            let pre_url = "https://twitter.com/i/web/status/";
            let tweet_url = pre_url.concat(id);
            let user_name = obj.name;
            let user_profile_image = obj.profile_image_url;
            result.push(
                <div>
                    <a href={tweet_url}>
                        <Card style={{width: 400, height: 250}}>
                            <CardContent>
                                <img src={user_profile_image}></img>
                                <Typography color="textSecondary" variant='body1' gutterBottom>{user_name}</Typography>
                                <Typography color="textSecondary" variant='body1' gutterBottom>{text}</Typography>
                                <br />
                                <Typography color="textSecondary" align='right'>{created_at}</Typography>
                            </CardContent>
                        </Card>
                    </a>
                </div>    
            )
            index += 1;
            break;
        }
        return result
    }

    render() {
        let {tweetsData} = this.props;

        return (
            <div className="col-md-5 justify-content-evenly" data-aos="fade-up" style={{borderLeft: '2px solid #11694E'}}>
                <h4>Methane Tweets</h4>
                <div style={{display: 'flex', flexDirection: 'row'}}>{this.getTweetElements(tweetsData)}</div>
            </div>
        );
    }
}

