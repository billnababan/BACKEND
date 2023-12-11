const query = require("../database");

const getSiswa = async (req, res) => {
  try {
    const data = await query(`SELECT id, nama_siswa, alamat, nomor_hp FROM siswa`);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const createSiswa = async (req, res) => {
  const { nama_siswa, alamat, nomor_hp } = req.body;

  try {
    //  prevent SQL injection
    const { SiswaId: id } = await query(
      `
        INSERT INTO siswa (
          nama_siswa, alamat, nomor_hp
        ) VALUES (
          ?, ?, ?
        );
      `,
      [nama_siswa, alamat, nomor_hp]
    );

    return res.status(200).json({
      message: "Todo added success!",
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const updateSiswa = async (req, res) => {
  const { id } = req.params;
  const { nama_siswa, alamat, nomor_hp } = req.body;
  try {
    const result = await query(
      `
      UPDATE siswa 
      SET 
      nama_siswa = ?,
      alamat = ?,
      nomor_hp = ?
      WHERE
      id = ?;
    `,
      [nama_siswa, alamat, nomor_hp, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `Siswa dengan id ${id} tidak ditemukan!`,
      });
    }
    return res.status(200).json({
      message: "Update siswa berhasil",
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const updateSiswaById = async (req, res) => {
  const { id } = req.params;
  const { nama_siswa, alamat, nomor_hp } = req.body;

  try {
    const result = await query(
      `
      UPDATE siswa
      SET
        nama_siswa  = COALESCE(?, nama_siswa),
        alamat = COALESCE(?, alamat),
        nomor_hp = COALESCE(?,nomor_hp)
      WHERE
      id = ?;
      `,
      [nama_siswa, alamat, nomor_hp, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `Update Siswa untuk id ${id} gagal dilakukan`,
      });
    }
    return res.status(200).json({
      message: "Update data  BERHASIL",
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
// BAGIAN DALAM RESULT QUERY ERROR //
const deteleSiswa = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query(
      `
      DELETE FROM siswa
       WHERE
       id = ?;
      `,
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Delete Siswa is Not found!!",
      });
    }
    return res.status(200).json({
      message: "Deleted Siswa is Succes",
      data: {
        id,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

module.exports = {
  deteleSiswa,
  updateSiswaById,
  updateSiswa,
  createSiswa,
  getSiswa,
};
