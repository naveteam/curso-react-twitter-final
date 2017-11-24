import React from 'react';
import Tweet from './Tweet';

const styles = {
    tweets: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        width: '100%'
    }
}

export default props => (
    <div style={styles.tweets}>
        {!props.tweets ? 
            <div>Não há tweets para serem mostrados</div>
            : props.tweets.map(tweet => <Tweet tweet={tweet}/>)
        }
    </div>
)