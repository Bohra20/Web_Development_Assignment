import React, { useState } from 'react';

function FormComponent() {
    // Initial form data state
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        productionPerDay: '',
        totalOrderQuantity: '',
        fabrics: [],
        majorFabric: 'None',
        chinaFabricPresent: 'No',
    });

    const [errors, setErrors] = useState({});
    const [chinaFabricOptions, setChinaFabricOptions] = useState([]);
    const [submittedData, setSubmittedData] = useState(null); // State to hold submitted data

    const handleChange = (e) => {
        const { name, value, type, checked, options } = e.target;

        if (type === 'checkbox' || type === 'radio') {
            setFormData({
                ...formData,
                [name]: checked ? value : ''
            });
        } else if (type === 'select-multiple') {
            const values = Array.from(options).filter(option => option.selected).map(option => option.value);
            setFormData({
                ...formData,
                [name]: values
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const addFabric = () => {
        setFormData({
            ...formData,
            fabrics: [
                ...formData.fabrics,
                {
                    fabricName: '',
                    perPieceRequirement: '',
                    chooseUnit: '',
                    processes: [],
                    color: [],
                    quantity: '',
                    stagesToSkip: [],
                }
            ]
        });
    };

    const removeFabric = (index) => {
        const newFabrics = formData.fabrics.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            fabrics: newFabrics
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.startDate || !formData.endDate) newErrors.date = "Both start and end dates are required.";
        if (formData.productionPerDay <= 0) newErrors.productionPerDay = "Production per day must be a positive number.";
        if (formData.totalOrderQuantity <= 0) newErrors.totalOrderQuantity = "Total order quantity must be a positive number.";
        return newErrors;
    };

    // Function to handle form submission and display data
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Store the submitted form data in the state to display it
        setSubmittedData(formData);

        // Optionally clear the form after submission
        setFormData({
            startDate: '',
            endDate: '',
            productionPerDay: '',
            totalOrderQuantity: '',
            fabrics: [],
            majorFabric: 'None',
            chinaFabricPresent: 'No',
        });
    };

    const handleChinaFabricChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            chinaFabricPresent: value
        });

        // Reset selected china fabrics if the option is "No"
        if (value === 'No') {
            setChinaFabricOptions([]);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="space-y-6 p-6 bg-white rounded-lg shadow-lg w-full max-w-lg" onSubmit={handleSubmit}>
                {/* Start Date */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        required
                    />
                    {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
                </div>

                {/* End Date */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        required
                    />
                    {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
                </div>

                {/* Production Per Day */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">Production Per Day Per Machine</label>
                    <input
                        type="number"
                        id="productionPerDay"
                        name="productionPerDay"
                        value={formData.productionPerDay}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        required
                    />
                    {errors.productionPerDay && <p className="text-sm text-red-500 mt-1">{errors.productionPerDay}</p>}
                </div>

                {/* Total Order Quantity */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">Total Order Quantity</label>
                    <input
                        type="number"
                        id="totalOrderQuantity"
                        name="totalOrderQuantity"
                        value={formData.totalOrderQuantity}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        required
                    />
                    {errors.totalOrderQuantity && <p className="text-sm text-red-500 mt-1">{errors.totalOrderQuantity}</p>}
                </div>

                {/* Fabric Inputs */}
                {formData.fabrics.map((fabric, index) => (
                    <div key={index} className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-700">Fabric {index + 1}</h3>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">Fabric Name</label>
                            <input
                                type="text"
                                name={`fabricName-${index}`}
                                value={fabric.fabricName}
                                onChange={(e) => {
                                    const updatedFabrics = [...formData.fabrics];
                                    updatedFabrics[index].fabricName = e.target.value;
                                    setFormData({ ...formData, fabrics: updatedFabrics });
                                }}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">Per Piece Requirement</label>
                            <input
                                type="number"
                                name={`perPieceRequirement-${index}`}
                                value={fabric.perPieceRequirement}
                                onChange={(e) => {
                                    const updatedFabrics = [...formData.fabrics];
                                    updatedFabrics[index].perPieceRequirement = e.target.value;
                                    setFormData({ ...formData, fabrics: updatedFabrics });
                                }}
                                min="0.01"
                                step="0.01"
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Other Fabric Details (Unit, Processes, Color, Quantity, etc.) */}

                        {/* Remove fabric button */}
                        <button
                            type="button"
                            onClick={() => removeFabric(index)}
                            className="text-red-500 mt-2"
                        >
                            Remove Fabric {index + 1}
                        </button>
                    </div>
                ))}

                {/* Add New Fabric */}
                <button
                    type="button"
                    onClick={addFabric}
                    className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                    Add Another Fabric
                </button>

                {/* China Fabric Present */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">Is China Fabric Present?</label>
                    <div className="flex items-center space-x-4 mt-2">
                        <div>
                            <input
                                type="radio"
                                id="chinaFabricYes"
                                name="chinaFabricPresent"
                                value="Yes"
                                checked={formData.chinaFabricPresent === 'Yes'}
                                onChange={handleChinaFabricChange}
                                className="mr-2"
                            />
                            <label htmlFor="chinaFabricYes" className="text-lg text-gray-700">Yes</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="chinaFabricNo"
                                name="chinaFabricPresent"
                                value="No"
                                checked={formData.chinaFabricPresent === 'No'}
                                onChange={handleChinaFabricChange}
                                className="mr-2"
                            />
                            <label htmlFor="chinaFabricNo" className="text-lg text-gray-700">No</label>
                        </div>
                    </div>

                    {formData.chinaFabricPresent === 'Yes' && (
                        <div className="mt-4">
                            <label className="block text-lg font-medium text-gray-700">Select China Fabrics</label>
                            <select
                                multiple
                                name="chinaFabricOptions"
                                value={chinaFabricOptions}
                                onChange={(e) => setChinaFabricOptions(Array.from(e.target.selectedOptions, option => option.value))}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                            >
                                <option value="Fabric1">Fabric 1</option>
                                <option value="Fabric2">Fabric 2</option>
                                <option value="Fabric3">Fabric 3</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    >
                        Submit
                    </button>
                </div>
            </form>

            {/* Display Submitted Data */}
            {submittedData && (
                <div className="mt-8 p-6 bg-gray-50 border border-gray-300 rounded-lg">
                    <h3 className="text-2xl font-semibold">Submitted Data</h3>
                    <pre className="mt-4 text-sm">{JSON.stringify(submittedData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default FormComponent;
