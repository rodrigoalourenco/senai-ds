import service from '../services/user.service.js'

const getAllUser = async (req, res) => {
    try {
        const result = await service.getAllUser();

        res.status(200).json({
            success: true,
            code: 200,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            data: error
        });
    }
};

export default { getAllUser }