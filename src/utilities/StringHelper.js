import moment from 'moment';
const xoa_dau = (str) => {
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
	str = str.replace(/đ/g, 'd');
	str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
	str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
	str = str.replace(/Đ/g, 'D');
	return str;
};
const dateDDMMYYYY = (date) => {
	if (date) {
		return moment(date).format('DD/MM/YYYY');
	} else {
		return '';
	}
};
const datehhmm = (date) => {
	if (date) {
		return moment(date).format('HH:mm');
	} else {
		return '';
	}
};
const hhmmssDDMMYYYY = (date) => {
	if (date) {
		return moment(date).format('HHmmssDDMMYYYY');
	} else {
		return '';
	}
};
const hhmmssDDMMYYYY2 = (date) => {
	if (date) {
		return moment(date).format('HH:mm:ss DD/MM/YYYY');
	} else {
		return '';
	}
};
const dateYYYYMMDD = (date) => {
	if (date) {
		return moment(date).format('YYYY-MM-DD');
	} else {
		return '';
	}
};
const delete_long_number = (string) => {
	const regex = /\d{11,30}/g;
	// return (string).replace(regex, handle)
	return string.replace(regex, '');
	// return regex.exec(string);
};
const detect_phone = (string) => {
	let new_string = delete_long_number(string);
	const regex = /0\d{9}/g;
	// return (string).replace(regex, handle)
	return new_string.match(regex);
	// return regex.exec(string);
};
const detect_money_sms = (string) => {
	const regex = /\+[\d,]{3,12}/g;
	let money = string.match(regex) ? string.match(regex)[0] : '';
	if (money) {
		money = money.replace(/[^a-zA-Z0-9 ]/g, '');
	}
	return money;

	// return regex.exec(string);
};
const check_sms_banking = (sms) => {
	let new_string = delete_long_number(sms.body);

	const regex_phone = /0\d{9}/g;

	const regex_sender = /VIETCOMBANK|VIETINBANK|AGRIBANK|BIDV|MBBANK|TECHCOMBANK|ACB|SACOMBANK|VPBANK/gi;

	// return regex_phone.test(new_string) && regex_sender.test(sms.address);
	return regex_sender.test(sms.address) && detect_money_sms(sms.body);

	// return regex.exec(string);
};
const add_dot_number = (number) => {
	if (number && number.toString() >= 1) {
		var string = number.toString();
		var length = string.length;
		var count = 0;
		var new_string = '';
		for (let i = length - 1; i >= 0; i--) {
			if (count < 3) {
				new_string = string[i] + new_string;
				count = count + 1;
			} else {
				new_string = string[i] + '.' + new_string;
				count = 1;
			}
		}
		return new_string;
	} else {
		return number;
	}
};
const REGEX_BHYT = /[A-Z]{2}\d{13}/g;
export {
	datehhmm,
	dateDDMMYYYY,
	hhmmssDDMMYYYY,
	detect_phone,
	detect_money_sms,
	check_sms_banking,
	hhmmssDDMMYYYY2,
	dateYYYYMMDD,
	add_dot_number,
	REGEX_BHYT,
	xoa_dau
};
