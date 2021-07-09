import '../scss/AudioPlayerItem.css';
import { useState } from 'react';


function AudioPlayerItem (props) {
    const [cover, setCover] = useState(props.cover);
    const [title, setTitle] = useState(props.title);
    const [album, setAlbum] = useState(props.album);
    const [artist, setArtist] = useState(props.artist);
    const [duration, setDuration] = useState(props.duration);

    return (
        <div className="AudioPlayerItem">
            <div className="AudioPlayerItemImageContainer">
                <img id="AudioPlayerItemImage" src="../img/icon_cd.jpg" alt=""></img>
            </div>
            <div className="AudioPlayerItemInfoContainer">
                <h3 id="AudioPlayerItemTitle">{title}</h3>
                <h5 id="AudioPlayerItemAlbum">{album}</h5>
                <h5 id="AudioPlayerItemArtists">{artist}</h5>
                <h5 id="AudioPlayerItemDuration">{duration}</h5>
            </div>
        </div>
    );
}

export default AudioPlayerItem;