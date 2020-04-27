//Declaration des constantes utilisée dans le controller
const LABEL_LIMIT_LENGTH = 40;
const DESCRIPTION_LIMIT_LENGTH = 255;
const PRIORITY_LIMIT_MAX = 5;
const PRIORITY_LIMIT_MIN = 0;

module.exports = {
    createTaskValidator: (req, res, next) => {
        const { label, description, priority, dateline } = req.body
        const errors = {};
        if (!label || (label.length > LABEL_LIMIT_LENGTH)) {
            errors.label = `must not be null or length great than ${LABEL_LIMIT_LENGTH}`;
        }

        if (!description || (description.length > DESCRIPTION_LIMIT_LENGTH)) {
            errors.description = `must not be null or length great than ${DESCRIPTION_LIMIT_LENGTH}`;
        }

        if (!priority || (parseInt(priority) > PRIORITY_LIMIT_MAX)) {
            errors.priority = `must not be null or granth than ${PRIORITY_LIMIT_MAX}`;
        }

        if (!dateline || ((new Date(dateline)) < new Date())) {
            errors.dateline = 'invalide dateline for task'
        }

        if (Object.keys(errors).length > 0)
            return res.status(400).json(errors);

        next();
    },
    updateTaskValidator: (req, res, next) => {
        const { label, description, priority, dateline, status } = req.body
        const errors = {}
        if (label && (label.length > LABEL_LIMIT_LENGTH)) {
            errors.label = `must not be null or length great than ${LABEL_LIMIT_LENGTH} ${label.length}`;
        }

        if (description && (description.length > DESCRIPTION_LIMIT_LENGTH)) {
            errors.description = `must not be null or length great than ${DESCRIPTION_LIMIT_LENGTH}`;
        }

        if (priority && (parseInt(priority) > PRIORITY_LIMIT_MAX) || (parseInt(priority) <= PRIORITY_LIMIT_MIN)) {
            errors.priority = `must not be null and must between ]${PRIORITY_LIMIT_MIN};${PRIORITY_LIMIT_MAX}]`;
        }

        if (dateline && ((new Date(dateline)) < new Date())) {
            errors.dateline = 'invalide dateline for task';
        }

        if (status && (parseInt(status) !== 0 && parseInt(status) !== 1)) {
            errors.status = 'invalide status fields 0 or 1';
        }

        if (Object.keys(errors).length > 0)
            return res.status(400).json(errors);
        next();
    }
}