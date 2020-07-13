const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const handleEvent = async (type, data) => {

    if(type === 'CommentCreated'){
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content,
            }
        });
    }
}

app.post('/events', (req, res) => {

    const {type, data} = req.body;

    handleEvent(type, data);
});

app.listen(4003, async ()=>{
    console.log('Listening on 4003');

    const res = await axios.get('http://event-bus-srv:4005/events');

    res.data.forEach(event => {
        console.log('Processing event: ', event.type);
        handleEvent(event.type, event.data);
    });
});
