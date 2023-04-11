import styles from "./SignUp.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValue } from "../../interface/Interface";

const genderType = ["남", "여"];

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<FormValue>();

  /**링크 네비게이트 */
  const navigate = useNavigate();

  /**회원가입 form 제출시 */
  const onSubmit = (data: FormValue) => {
    console.log(data);
  };

  return (
    <>
      <h1 className={styles.signUpTitle}>회원가입</h1>
      <div className={styles.signUp}>
        <img
          className={styles.signUpImg}
          alt=""
          src="https://velog.velcdn.com/images/view_coding/post/6e4d7220-8bc8-4e88-9d4b-f3dd9e09b523/image.png"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.typeDiv}>
            <label>Id</label>
            <input
              placeholder="Id를 입력하세요."
              {...register("Id", {
                required: {
                  value: true,
                  message: "필수 정보입니다.",
                },
                maxLength: {
                  value: 15,
                  message: "15자까지 입력가능합니다.",
                },
                minLength: {
                  value: 3,
                  message: "2자 이상 입력하세요.",
                },
                pattern: {
                  value: /^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/,
                  message: "공백을 제거해 주세요.",
                },
              })}
            />
          </div>
          <div className={styles.errorMessage}>
            {errors.Id && <p>{errors.Id.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호"
              autoComplete="off"
              {...register("password", {
                required: {
                  value: true,
                  message: "필수 정보입니다.",
                },
                minLength: {
                  value: 8,
                  message: "8자 이상 입력하세요.",
                },
                maxLength: {
                  value: 16,
                  message: "16자까지 입력가능합니다.",
                },
                pattern: {
                  // eslint-disable-next-line
                  // value: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,

                  value:
                    // eslint-disable-next-line
                    /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/,
                  // eslint-disable-next-line

                  message: "특수문자 1개 이상 넣어주세요.",
                },
              })}
            />
          </div>
          <div className={styles.errorMessage}>
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label>비밀번호 확인</label>
            <input
              type="password"
              placeholder="비밀번호 확인"
              autoComplete="off"
              {...register("passwordConfirm", {
                required: {
                  value: true,
                  message: "필수 정보입니다.",
                },
                validate: {
                  check: (val) => {
                    if (getValues("password") !== val) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                  },
                },
              })}
            />
          </div>
          <div className={styles.errorMessage}>
            {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label>성명</label>
            <input
              placeholder="이름을 입력하세요"
              {...register("name", {
                required: {
                  value: true,
                  message: "필수 정보입니다.",
                },
                maxLength: {
                  value: 10,
                  message: "20자까지 입력 가능합니다.",
                },
                pattern: {
                  value: /^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/,
                  message:
                    "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)",
                },
              })}
            />
          </div>
          <div className={styles.errorMessage}>
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label>전화번호</label>
            <input
              type="number"
              placeholder="전화번호를 입력하세요."
              {...register("phone_number", {
                required: "필수 정보입니다.",
              })}
            />
          </div>
          <div className={styles.errorMessage}>
            {errors?.email && <p>{errors.phone_number?.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label>Email</label>
            <input
              placeholder="이메일을 입력하세요"
              {...register("email", {
                required: "필수 정보입니다.",
                pattern: {
                  // eslint-disable-next-line
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "이메일 형식에 맞지 않습니다.",
                },
                maxLength: {
                  value: 40,
                  message: "40자까지 입력가능합니다.",
                },
              })}
            />
          </div>
          <div className={styles.errorMessage}>
            {errors?.email && <p>{errors.email.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label>성별</label>
            {genderType.map((gender) => (
              <div key={gender} className={styles.genderTypeDiv}>
                <input
                  className={styles.genderRadio}
                  key={Math.random()}
                  type="radio"
                  value={gender}
                  {...register("gender", {
                    required: "필수 정보입니다.",
                  })}
                />
                <h3 key={Math.random()}>{gender}</h3>
              </div>
            ))}
          </div>
          <div className={styles.errorMessage}>
            {errors?.gender && <p>{errors.gender.message}</p>}
          </div>

          <div className={styles.buttonDiv}>
            <button
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              이전
            </button>

            <button>회원가입</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default SignUp;
