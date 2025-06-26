import './SecondaryButton.css';

const SecondaryButton = (props) => {
    return (
        <button
            className='secondaryButton'
            style={props.style}
            disabled={props.disabled}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default SecondaryButton;