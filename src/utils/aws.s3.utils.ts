import { randomUUID } from 'crypto';



export class S3Client {
  signedUrlExpireSeconds = 60 * 60 * 5;
  cloudFront = new aws.CloudFront.Signer(
    AWS_CDN_KEY_PAIR_ID,
    AWS_PUBLIC_ACCESS_KEY,
  );

  getUploadURL(fileName: string) {
    aws.config.update({
      accessKeyId: AWSAccessKeyId,
      secretAccessKey: AWSSecretAccessKey,
      region: AWS_REGION,
      signatureVersion: 'v4',
    });

    const s3 = new aws.S3();
    const myBucket = S3_BUCKET;

    const Key = `${randomUUID()}-${fileName}`;

    try {
      const url = s3.getSignedUrl('putObject', {
        Bucket: myBucket,
        Key,
        Expires: this.signedUrlExpireSeconds,
      });
      return { url, key: Key };
    } catch (error) {
      console.log('error', error);

      throw error;
    }
  }

  getDownloadURL(Key: string, awsCdnUrl?: string) {
    const cdnUrl = awsCdnUrl || AWS_CDN_BASEURL;
    const tomorrow = moment().add(1, 'day').format('YYYY-MM-DD');

    const url = getSignedUrl({
      url: `${cdnUrl}/${Key}`,
      dateLessThan: tomorrow,
      privateKey: AWS_PUBLIC_ACCESS_KEY,
      keyPairId: AWS_CDN_KEY_PAIR_ID,
    });

    return url;
  }
}
