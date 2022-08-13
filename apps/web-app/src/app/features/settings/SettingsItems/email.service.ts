import emailjs from '@emailjs/browser';

export function sendEmail(current: string | HTMLFormElement) {
  return emailjs.sendForm('service_uif8xef', 'template_19pli5i', current, 'u6-3LEVQRHWt7qLvU');
}
