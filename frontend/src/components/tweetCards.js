import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import { light } from '@material-ui/core/styles/createPalette';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';

export default class TweetCards extends Component {

    constructor(props) {
        super(props);
    }

    // getTweetElements(tweetsData) {
    //     console.log("TWEET DATA:", tweetsData);
    //     let result = [];
    //     let index = 0;
    //     for (let obj of tweetsData) {
    //         let {id, created_at, profile_image_url, text, author_id} = obj;
    //         let pre_url = "https://twitter.com/i/web/status/";
    //         let tweet_url = pre_url.concat(id);
    //         result.push(
    //             <div>
    //                 <a href={tweet_url}>
    //                     <Card style={{width: 400, height: 250}}>
    //                         <CardContent>
    //                             <img src={profile_image_url}></img>
    //                             {/* <Typography color="textSecondary" variant='body1' gutterBottom>{user_name}</Typography> */}
    //                             <Typography color="textSecondary" variant='body1' gutterBottom>{text}</Typography>
    //                             <br />
    //                             <Typography color="textSecondary" align='right'>{created_at}</Typography>
    //                         </CardContent>
    //                     </Card>
    //                 </a>
    //             </div>    
    //         )
    //         index += 1;
    //         break;
    //     }
    //     return result
    // }

    getTweetElements(tweetsData) {
        console.log("TWEET DATA:", tweetsData);
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
                    <List style={{width: '100%', maxWidth: '100%', maxHeight: '100%', position: 'relative', overflow: 'auto', backgroundColor: '#B9B9B9'}}>
                        {this.getTweetElements(tweetsData)}
                    </List>
                </div>
            </div>
            
        );
    }
}

