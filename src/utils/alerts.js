import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

export const showSuccess = (message) =>
    toast.success(message, { duration: 8000 });
export const showError = (message) => toast.error(message, { duration: 8000 });
export const showInfo = (message) => toast(message, { duration: 8000 });

export const showConfirm = async (title, text = '') => {
    const result = await Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    });
    return result.isConfirmed;
};
