import './PrimaryButton.css';

const PrimaryButton = (props) => {
    return (
        <button
            className='primaryButton'
            style={props.style}
            disabled={props.disabled}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default PrimaryButton;