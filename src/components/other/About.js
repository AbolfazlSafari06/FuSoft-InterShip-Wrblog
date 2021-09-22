import img from './Fusoft.png';
import { ClassicEditor } from '@ckeditor/ckeditor5-build-classic';

function About() {
  return (
    <div className="container my-4  body"  >
      <div className="row justify-content-center">
        <div className="col-md-auto">
          <h1>درباره فیوسافت</h1>
          <div className="lh-lg my-4">
            <p className="border p-4" >
              رویای سبز نرم افزارهای آینده یا فیوسافت از سال 1392 فعالیت خود را در قالب یک تیم برون سپار با شرکت برید سامانه نوین آغاز کرد.
              تجربه موفق همکاری با شرکت برید سامانه نوین باعث شد تا شرکت این تجربه را با شرکت‌های دیگر نیز تکرار کند. این شرکت در سال 1396 با همکاری یک شرکت استرالیایی تولید یک سیستم مبادله ارز بین المللی را آغاز کرد و فعالیت خود را به سیستم های مبتنی بر بلاکچین توسعه داد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
