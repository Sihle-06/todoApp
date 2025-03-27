
INSERT INTO tasks (task_name, task_status) VALUES ('Study','Completed')

UPDATE tasks SET task_status = 'Completed' WHERE tasks_id = 4


const tasks_id  = req.params.tasks_id;
        const checkQueryStatus = `SELECT task_status FROM tasks WHERE tasks_id = ${tasks_id} `;
        const result = await pool.query(checkQueryStatus);
        console.log(result);
        

        if (result.rows.length > 0) {
            
            return res.status(409).send('Tasks is completed');
        }
