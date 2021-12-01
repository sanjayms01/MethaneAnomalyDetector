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
            let tweet_url = pre_url.concat(id)
            result.push(
                <a href={tweet_url}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" variant='h3' gutterBottom>{text}</Typography>
                            <br />
                            <Typography color="textSecondary" align='right'>{created_at}</Typography>
                        </CardContent>
                    </Card>
                </a>          
            )
            index += 1;
        }
        return result
    }

    render() {

        let {tweetsData} = this.props;
        console.log(tweetsData);
        return (
            <div className="col-md-5 justify-content-evenly" data-aos="fade-up" style={{borderLeft: '2px solid #11694E'}}>
                <h4>Methane Tweets</h4>
                <div>{this.getTweetElements(tweetsData)}</div>
            </div>
        );
    }
}

