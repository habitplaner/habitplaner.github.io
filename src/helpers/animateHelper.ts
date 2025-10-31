import styles from '@ui-kit/styles/animations.module.css';
let debounce: ReturnType<typeof setTimeout>;
export const accentCalendarHabit = (
  id: string,
  className = styles.animationTada
) => {
  if (debounce) clearTimeout(debounce);
  debounce = setTimeout(() => {
    const el = document.getElementById(`calendarHabit${id}`);
    if (el) {
      el.classList.add(className);
      el.onanimationend = () => {
        el.classList.remove(className);
      };
    }
  }, 600);
};
