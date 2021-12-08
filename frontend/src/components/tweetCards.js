import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

export default class TweetCards extends Component {

    constructor(props) {
        super(props);
    }

    getTweetElements(tweetsData) {
        let result = [];
        let index = 0;
        for (let obj of tweetsData) {
            let {id, created_at, profile_image_url, text} = obj;

            // Truncate tweet text
            let maxLength = 100;
            let trimmedText = text.substr(0, maxLength);
            trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" "))).concat("...")

            // Make created_date readable
            let date = new Date(created_at);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let dt = date.getDate();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let am_pm = hours >= 12 ? 'pm': 'am';

            if (dt < 10) {
                dt = '0' + dt;
            }

            if (month < 10) {
                month = '0' + month;
            }

            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;

            let readable_date = month + '/' + dt + '/' + year + ' ' + hours + ':' + minutes + ' ' + am_pm + ' UTC';

            // Get tweet URL
            let pre_url = "https://twitter.com/i/web/status/";
            let tweet_url = pre_url.concat(id);

            result.push(
                <div>
                    <a href={tweet_url} target='_blank'>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src={profile_image_url} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={readable_date}
                                secondary={
                                    <React.Fragment>
                                        {/* <Typography
                                            component="span"
                                            variant="body2"
                                            style={{display: 'inline'}}
                                            color="textPrimary"
                                        >
                                            {created_at}
                                        </Typography> */}
                                        {trimmedText}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </a>
                    <Divider variant="inset" component="li" />
                </div>    
            )
            index += 1;
        }
        return result
    }

    render() {
        let {tweetsData} = this.props;

        return (
            <div className="col-md-5 justify-content-evenly" style={{width: '100%', height: '100%'}} data-aos="fade-up"> 
                <div style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center'}}>
                    <List style={{width: '100%', maxWidth: '100%', maxHeight: '100%', position: 'relative', overflow: 'auto', backgroundColor: '#FFFEFF'}}>
                        {this.getTweetElements(tweetsData)}
                    </List>
                </div>
            </div>
            
        );
    }
}

