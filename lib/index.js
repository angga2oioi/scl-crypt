const crypto = require('crypto'),
	algorithm = 'aes-256-ctr';
	
const process={
	encrypt:function(str,secret){
		
		const key = crypto.createHash('sha256').update(String(secret)).digest();
		const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        const encrypted = cipher.update(String(str), 'utf8', 'hex') + cipher.final('hex');

        return iv.toString('hex') + encrypted;
		
	},
	decrypt:function(str,secret){
		const key = crypto.createHash('sha256').update(String(secret)).digest();
		
		const stringValue = String(str);
        const iv = Buffer.from(stringValue.slice(0, 32), 'hex');
        const encrypted = stringValue.slice(32);
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
	}
}
module.exports=process;	