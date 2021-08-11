import './App.css';
import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Amplify, {API} from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(3),
    },
    textField: {
        width: '20ch',
    },
}));


function App() {
    const classes = useStyles();
    const [myMessage, setMessage] = useState('Type your message here');

    async function sendMessage(e) {
        e.preventDefault();
        const apiName = 'contactus';
        const path = '/send';
        const myInit = { // OPTIONAL
            body: {nome: 'anonymous', email: 'anonymous@anonymous.net', mensagem: myMessage},
            headers: {}, // OPTIONAL
        };
        return await API.put(apiName, path, myInit);
    }

    return (
        <div className="App">
            <div className={classes.root}>
                <FormControl fullWidth className={classes.margin}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Contact-us"
                        multiline
                        rows={4}
                        defaultValue={myMessage}
                        variant="outlined"
                        onChange={({text}) => setMessage(text)}
                    />
                    <Button variant="contained" color="primary" className={classes.margin} onClick={sendMessage}>
                        Send
                    </Button>
                </FormControl>
            </div>
        </div>
    );
}

export default App;
