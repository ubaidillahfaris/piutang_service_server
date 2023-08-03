const OracleDB = require('oracledb')
const database = require('../config/database')
const moment = require('moment')
const { QueryTypes } = require('sequelize')

class sismiopController {



    async ketetapan(req, res) {

        const connect = await database.sismiop;

        const tanggal = req.query?.tanggal;
        const startOfDay = moment(tanggal).startOf('day').format('YYYY-MM-DD')
        const endOfDay = moment(tanggal).endOf('day').format('YYYY-MM-DD')

        try {
           

        let query = `SELECT
                NULL AS kode_skp,
                NULL AS nama_skp,
                NULL AS id_jenis,
                'PBBP-2' AS jenis_pendapatan,
                NULL AS kode_objek,
                '4.1.1.112.001' AS kode_rincian,
                'PBB' AS rincian_objek,
                s.NM_WP_SPPT AS nama_wp,
                s.JLN_WP_SPPT || ', ' || s.BLOK_KAV_NO_WP_SPPT || ' RT.' || s.RW_WP_SPPT || ', RW.' || s.RT_WP_SPPT || ', ' || s.KELURAHAN_WP_SPPT || ', ' || s.KOTA_WP_SPPT AS alamat_wp,
                s.THN_PAJAK_SPPT AS tahun,
                s.KD_PROPINSI || s.KD_DATI2 || s.KD_KECAMATAN || s.KD_KELURAHAN || s.KD_BLOK || s.NO_URUT || s.KD_JNS_OP || ' ' || s.THN_PAJAK_SPPT AS nop,
                s.TGL_TERBIT_SPPT AS tgl_pendataan,
                s.TGL_JATUH_TEMPO_SPPT AS tgl_jatuh_tempo,
                s.KD_PROPINSI || s.KD_DATI2 || s.KD_KECAMATAN || s.KD_KELURAHAN || s.KD_BLOK || s.NO_URUT || s.KD_JNS_OP || ' ' || s.THN_PAJAK_SPPT AS no_surat,
                TRUNC(TO_DATE(s.THN_PAJAK_SPPT,'YYYY'), 'YYYY') AS masa_awal,
                TRUNC(TO_DATE(s.THN_PAJAK_SPPT,'YYYY'), 'YYYY') + INTERVAL '1' YEAR - INTERVAL '1' DAY AS masa_akhir,
                s.PBB_YG_HARUS_DIBAYAR_SPPT AS nominal
            FROM SPPT s
            WHERE (
                s.TGL_TERBIT_SPPT >= TO_DATE($startOfDay,'YYYY-MM-DD') 
                AND  
                s.TGL_TERBIT_SPPT <= TO_DATE($endOfDay,'YYYY-MM-DD')
            )`;

            const rows = await connect.query(query,{
                bind:{
                    startOfDay : startOfDay,
                    endOfDay: endOfDay
                }, type: QueryTypes.SELECT
            });

            const data = rows.map((value) => {
                const lowerCaseObj = {};
                
                Object.keys(value).forEach(key => {
                    lowerCaseObj[key.toLowerCase()] = value[key];
                });

                return lowerCaseObj;
            })


            return res.send(data);

        } catch (error) {
            console.log(error)
            return res.status(500).send({
                message:error.message
            })
        }
        
    }


}


module.exports = sismiopController;