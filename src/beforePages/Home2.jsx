// 대체 텍스트 개선

import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

import Banner1 from '../assets/images/banner1.png';
import Banner2 from '../assets/images/banner2.png';
import Banner3 from '../assets/images/banner3.png';
import BuyerTopNav from '../beforeComponents/common/BuyerTopNav';
import Footer from '../components/common/Footer';

const Home = () => {
  const [data, setData] = useState(null);
  const banners = useRef(null);
  const [currBanner, setCurrBanner] = useState(0);

  useEffect(() => {
    (async () => {
      const url = 'https://openmarket.weniv.co.kr';
      const path = '/products/';
      const res = await fetch(url + path);
      const json = await res.json();
      setData(json.results);
    })();
  }, []);

  const bannerData = [
    {
      img: Banner1,
      textList: [
        '사람과 환경을 위한 지속 가능한 포장재',
        '호두 그린 박스',
        '호두 직배송 상품 구경하러 가기',
      ],
    },
    {
      img: Banner2,
      textList: ['친구 초대하면 친구도 나도 1만원씩', '너도 받고 나도 받고'],
    },
    {
      img: Banner3,
      textList: [
        '한 눈에 보는 8월 호두 혜택',
        '최대 20% 할인 쿠폰 제공!',
        '기간: 2023년 8월 1일부터 2023년 8월 21일까지',
      ],
    },
  ];
  const handlePrevBtn = (e) => {
    e.preventDefault();
    const bannersTransform = banners.current.style.transform;
    if (bannersTransform !== '' && bannersTransform !== 'translateX(0%)') {
      const bannersX = parseInt(bannersTransform.replace(/[^\d-]/g, ''));
      banners.current.style.transform = `translateX(${bannersX + 100}%)`;
      const currIndex = bannersX / -100 - 1;
      setCurrBanner(currIndex);
    }
  };

  const handleNextBtn = (e) => {
    e.preventDefault();

    const bannersTransform = banners.current.style.transform;

    if (bannersTransform === '') {
      banners.current.style.transform = 'translateX(-100%)';
      setCurrBanner(1);
      return;
    }

    const bannersX = parseInt(bannersTransform.replace(/[^\d-]/g, ''));
    const currBannerNum = bannersX / -100 + 1;

    if (currBannerNum !== bannerData.length) {
      banners.current.style.transform = `translateX(${bannersX - 100}%)`;
      setCurrBanner(currBannerNum);
    }
  };

  const rotateSlide = () => {
    setInterval(() => {
      const bannersTransform = banners.current.style.transform;

      if (bannersTransform === '') {
        banners.current.style.transform = 'translateX(-100%)';

        setCurrBanner(1);
        return;
      }

      const bannersX = parseInt(bannersTransform.replace(/[^\d-]/g, ''));
      const currBannerNum = bannersX / -100 + 1;

      if (currBannerNum === bannerData.length) {
        banners.current.style.transform = 'translateX(0%)';
        setCurrBanner(0);
      } else {
        banners.current.style.transform = `translateX(${bannersX - 100}%)`;

        setCurrBanner(currBannerNum);
      }
    }, 2000);
  };

  //  useEffect(() => {
  //    if (bannerData.length > 1) {
  //     rotateSlide();
  //  }
  //  }, []);

  return (
    <>
      <BuyerTopNav />
      <StyledMain>
        <section className='banner-frame'>
          <ul id='banners' ref={banners}>
            {bannerData &&
              bannerData.map((v, i) => (
                <li>
                  <a href='#none'>
                    <img src={v.img} alt='' />
                    {/* 태그 바꾸기 */}
                    <p className='a11y-hidden'>
                      {v.textList.map((text, i) => {
                        if (!i) {
                          return text;
                        } else {
                          return (
                            <>
                              <br />
                              {text}
                            </>
                          );
                        }
                      })}
                      <br />
                      {`${bannerData.length}개의 슬라이드 중 ${i + 1}번`}
                    </p>
                  </a>
                </li>
              ))}
          </ul>

          {bannerData && (
            <>
              <button
                aria-label='이전 슬라이드 보기'
                aria-controls='banners'
                id='prev-btn'
                onClick={handlePrevBtn}
              ></button>
              <button
                aria-label='다음 슬라이드 보기'
                aria-controls='banners'
                id='next-btn'
                onClick={handleNextBtn}
              ></button>
            </>
          )}
          {bannerData && (
            <ol className='indicators'>
              {bannerData.map((_, i) => (
                <li className={currBanner === i ? 'curr' : ''}></li>
              ))}
            </ol>
          )}
        </section>

        <ul className='product-list'>
          {data &&
            data.map((v) => {
              return (
                <li key={v.product_id}>
                  <a href='#none'>
                    <div>
                      <img src={v.image} alt='' />
                    </div>
                    <div className='store'>{v.store_name}</div>
                    <div>{v.product_name}</div>
                    <div className='price'>
                      <span>{v.price}</span>원
                    </div>
                  </a>
                </li>
              );
            })}
        </ul>
      </StyledMain>
      <Footer></Footer>
    </>
  );
};

const StyledMain = styled.main`
  padding-top: 90px;

  /* 배너 캐러셀 테스트 */
  .banner-frame {
    overflow-x: hidden;
    position: relative;

    button {
      z-index: 1;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
    }
    button::before,
    button::after {
      content: '';
      position: absolute;
      width: 2px;
      height: 14px;
      border-radius: 2px;
      background: black;
    }
    #next-btn::after {
      transform: rotate(45deg);
      bottom: 14px;
    }
    #next-btn::before {
      transform: rotate(-45deg);
      top: 13px;
    }
    #prev-btn::after {
      transform: rotate(45deg);
      top: 13px;
    }
    #prev-btn::before {
      transform: rotate(-45deg);
      bottom: 14px;
    }
    #prev-btn {
      left: 38px;
    }
    #next-btn {
      right: 38px;
    }
  }
  #banners {
    height: 500px;
    display: flex;
    li {
      a:focus {
        outline-offset: -2px;
      }
      flex-shrink: 0;
      width: 100%;
      img {
        height: 100%;
        object-fit: cover;
        object-position: 24% top;
      }
    }
  }
  .indicators {
    position: absolute;
    left: 50%;
    bottom: 20px;
    font-size: 0;
    li {
      display: inline-block;
      width: 6px;
      height: 6px;
      background: white;
      border-radius: 50%;
    }
    li.curr {
      background: black;
    }
    li:not(:first-child) {
      margin-left: 6px;
    }
  }

  .product-list {
    max-width: 1280px;
    margin: 80px auto 180px;
    padding: 0px 52px;
    display: grid;
    gap: 70px;
    grid-template-columns: repeat(3, 1fr);

    img {
      object-fit: cover;
      box-sizing: border-box;
      aspect-ratio: 1 / 1;
      border-radius: 10px;
      border: 1px solid var(--gray-300);
    }

    .store {
      font-size: 1.6rem;
      line-height: 2.2rem;
      color: var(--gray-400);
      margin: 16px 0 10px;
    }

    strong {
      font-size: 1.8rem;
      line-height: 2.2rem;
    }

    .price {
      margin-top: 10px;
      font-size: 1.6rem;
      span {
        font-size: 2.4rem;
        font-weight: 700;
      }
    }
  }
`;
export default Home;
