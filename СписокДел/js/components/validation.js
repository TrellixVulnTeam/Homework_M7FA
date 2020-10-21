export function validate(elements) {
    let valid = false;
    let count = 0;
    for (const checkBox of elements) {
        if (checkBox.checked) {
            count++
        }
        if (count > 2) {
            valid = true;
        }
    }
    return valid;
}