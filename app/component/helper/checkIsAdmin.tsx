'use client';
export default function checkIsAdmin() {
    const roleFromStorage = localStorage.getItem('role');
    if(roleFromStorage === "ADMIN") {
        return true;
    } else {
        return false;
    }
}