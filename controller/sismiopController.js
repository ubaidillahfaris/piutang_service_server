const OracleDB = require('oracledb')

class sismiopController {



    async getData(req, res) {


        try {
            const connection = await OracleDB.getConnection({
                user: 'PBB',
                password: 'Z2184SDNHGF8121RT58',
                connectString: '192.120.20.10:1521/SIMPBB',
            });
            
            const result = await connection.execute(`SELECT CURRENT_DATE FROM DUAL`);
            console.dir(result.rows, { depth: null });

            return res.send({
                message: 'connection establisheds'
            })
            // await connection.close();
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                message:error.message
            })
        }
        
    }


}


module.exports = sismiopController;