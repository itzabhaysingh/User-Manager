import './Spinner.css'; // Import CSS for spinner styles

const Spinner = () => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Spinner;