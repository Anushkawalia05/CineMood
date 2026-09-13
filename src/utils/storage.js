const saveData = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error("Error saving data:", error);
        return false;
    }
};

const getData = (key, defaultValue = null) => {
    try {
        const data = localStorage.getItem(key);

        if (data === null) {
            return defaultValue;
        }

        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading data:", error);
        return defaultValue;
    }
};

const removeData = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error("Error removing data:", error);
        return false;
    }
};

export { saveData, getData, removeData };