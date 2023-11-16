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

export const setupDatabase = async () => {
  // Create tables or perform any other initialization tasks here
  // Example:
  const roomsTableQuery = `
  CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    icon TEXT
  );
  `;

  const roomdevicesTableQuery = `
    CREATE TABLE IF NOT EXISTS roomdevices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      roomid INTEGER,
      name TEXT,
      power INTEGER,
      icon TEXT,
      FOREIGN KEY (roomid) REFERENCES rooms(id) ON DELETE CASCADE
    );
    `;

  try {
    await executeSql(roomsTableQuery);
    await executeSql(roomdevicesTableQuery);
    console.log('Database setup complete');
  } catch (error) {
    console.log('Error setting up database:', error);
  }
};

export const insertData = async (data) => {
  setupDatabase()
  const { name, icon } = data
  const insertQuery = `
      INSERT INTO rooms (name, icon)
      VALUES (?, ?);
    `;

  try {
    await executeSql(insertQuery, [name, icon]);
    console.log('Data inserted successfully');
  } catch (error) {
    console.log('Error inserting data:', error);
  }
};

export const fetchAllData = async () => {
  setupDatabase();
  const roomsQuery = `
    SELECT * FROM rooms;
  `;
  const roomdevicesQuery = `
    SELECT COUNT(*) as count FROM roomdevices WHERE roomid = ?;
  `;

  try {
    const roomsResult = await executeSql(roomsQuery);
    const rooms = roomsResult.rows._array;

    const data = await Promise.all(
      rooms.map(async (room) => {
        const result = await executeSql(roomdevicesQuery, [room.id]);
        const count = result.rows._array[0].count;
        room.numofDevices = count;
        return room;
      })
    );

    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.log('Error fetching data:', error);
    return [];
  }
};

export const fetchById = async (id) => {
  setupDatabase()
  const selectQuery = `
    SELECT FROM rooms WHERE id=?;
  `;

  try {
    const result = await executeSql(selectQuery, [id]);
    const data = result.rows._array;
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.log('Error fetching data:', error);
    return [];
  }
};

export const updateData = async (id, newData) => {
  setupDatabase()
  const { name, icon } = newData;

  const updateQuery = `
      UPDATE rooms SET name = ?, icon = ? WHERE id = ?
      VALUES(?,?,?);
    `;

  try {
    await executeSql(updateQuery, [ name, icon, id]);
    console.log('Data updated successfully');
  } catch (error) {
    console.log('Error updating data:', error);
  }
};

export const deleteData = async (id) => {
  setupDatabase()
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

