import { S3 } from 'aws-sdk';

export class AwsUtils {
  private static s3Instance: S3;

  private static getS3Instance(): S3 {
    if (!this.s3Instance) {
      this.s3Instance = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });
    }
    return this.s3Instance;
  }

  public static uploadS3(buffer, mimetype, name): Promise<string> {
    const s3 = this.getS3Instance();
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: String(name),
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: mimetype,
      ACL: 'public-read',
    };
    return new Promise<string>((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data['Location']);
      });
    });
  }
}
