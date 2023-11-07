/* DATABASE */
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('smart_home.db'); // Replace 'your_database_name' with your preferred name

// Function to execute SQL queries
const executeSql = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        params,
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const insertData = async (data) => {
    const {name, icon, numOfDevices} = data
    const insertQuery = `
      INSERT INTO rooms (name, icon, numOfDevices)
      VALUES (?, ?, ?);
    `;

    try {
        await executeSql(insertQuery, [name, icon, numOfDevices]);
        console.log('Data inserted successfully');
    } catch (error) {
        console.log('Error inserting data:', error);
    }
};

export const fetchAllData = async () => {
    const selectQuery = `
      SELECT * FROM rooms;
    `;

    try {
        const result = await executeSql(selectQuery);
        const data = result.rows._array;
        console.log('Fetched data:', data);
        return data;
    } catch (error) {
        console.log('Error fetching data:', error);
        return [];
    }
};

export const updateData = async (id, newData) => {
    const { name, icon, numOfDevices } = newData;

    const updateQuery = `
      UPDATE rooms SET name = ?, icon = ?, numOfDevices = ? WHERE id = ?;
    `;

    try {
        await executeSql(updateQuery, [ id, name, icon, numOfDevices]);
        console.log('Data updated successfully');
    } catch (error) {
        console.log('Error updating data:', error);
    }
};

export const deleteData = async (id) => {
    const deleteQuery = `
      DELETE FROM rooms WHERE id = ?;
    `;

    try {
        await executeSql(deleteQuery, [id]);
        console.log('Data deleted successfully');
    } catch (error) {
        console.log('Error deleting data:', error);
    }
};

